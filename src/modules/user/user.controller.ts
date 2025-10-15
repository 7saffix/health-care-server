import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createPatient(req);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "patient registration successful",
      data: result,
    });
  }
);

export const userController = { createPatient };
