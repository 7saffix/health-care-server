import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};

export default sendResponse;
