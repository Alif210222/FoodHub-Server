import { Response } from "express";

type TReponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TReponse<T>) => {
  const { statusCode, success, message, data: DataReponse } = data;

  res.status(statusCode).json({
    success,
    message,
    data: DataReponse,
  });
};

export default sendResponse;