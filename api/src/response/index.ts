import { Response } from "express";

interface IResponseSchema {
  data?: any;
  status: number;
}

export const respondWithSchema = (response: IResponseSchema) => response;

export const sendOK = (res: Response, data: any = "") =>
  res.status(200).send(
    respondWithSchema({
      data,
      status: 200,
    })
  );

export const sendError = (res: Response, status: number, data: any = null) => {
  return res.status(status).send(
    respondWithSchema({
      data,
      status,
    })
  );
};
