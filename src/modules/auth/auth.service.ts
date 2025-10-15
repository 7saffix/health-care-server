import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import { IUser } from "../user/user.interface";
import { UserStatus } from "@prisma/client";
import { generateToken } from "../../utils/jwt";
import config from "../../config";

const login = async (payload: IUser) => {
  const existUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!existUser) {
    throw new Error("user does not exist");
  }

  const matchPassword = await bcrypt.compare(
    payload.password,
    existUser.password
  );

  if (!matchPassword) {
    throw new Error("incorrect password");
  }

  const accessToken = generateToken(
    {
      email: existUser.email,
      role: existUser.role,
    },
    config.JWT_ACCESS_SECRET as string,
    { expiresIn: "10d" }
  );
  const refreshToken = generateToken(
    {
      email: existUser.email,
      role: existUser.role,
    },
    config.JWT_REFRESH_SECRET as string,
    { expiresIn: "60d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = { login };
