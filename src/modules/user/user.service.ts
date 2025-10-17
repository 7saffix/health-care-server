import { Request } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../utils/fileUploader";
import { paginationHelper } from "../../utils/paginationHelper";
import { Prisma } from "@prisma/client";

const createPatient = async (req: Request) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.profilePhoto = uploadResult?.secure_url;
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const { password, ...patientData } = req.body;

  const result = await prisma.$transaction(async (trn) => {
    await trn.user.create({
      data: {
        email: req.body.email,
        password: hashPassword,
      },
    });

    return await trn.patient.create({
      data: patientData,
    });
  });

  return result;
};

const getAll = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(options);
  const { searchTerm, ...filterData } = filters;
  const userSearchAbleField = ["email"];

  const conditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    conditions.push({
      OR: userSearchAbleField.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput =
    conditions.length > 0
      ? {
          AND: conditions,
        }
      : {};

  const users = await prisma.user.findMany({
    //pagination
    skip,
    take: limit,

    //searching and filtering
    where: whereCondition,
    //sorting
    orderBy: { [sortBy]: sortOrder },
  });

  return users;
};

export const userService = { createPatient, getAll };
