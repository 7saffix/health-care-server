import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.login(req.body);

    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });

    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 60,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "login successful",
      data: result,
    });
  }
);

export const authController = { login };
