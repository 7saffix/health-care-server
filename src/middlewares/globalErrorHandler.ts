import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let success = false;
  let statusCode = 500;
  let message = err.message;

  res.status(statusCode).json({
    success,
    message,
    err,
  });
};

export default globalErrorHandler;
