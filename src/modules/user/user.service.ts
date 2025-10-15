import { Request } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../utils/fileUploader";

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

export const userService = { createPatient };
