import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import pick from "../../utils/pick";

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

const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filterAndSearch = pick(req.query, ["role", "status", "searchTerm"]);
    const paginationAndSort = pick(req.query, [
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ]);

    const result = await userService.getAll(filterAndSearch, paginationAndSort);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "users retrieved successfully",
      data: result,
    });
  }
);

export const userController = { createPatient, getAll };
