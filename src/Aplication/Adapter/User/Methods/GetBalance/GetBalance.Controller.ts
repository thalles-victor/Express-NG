import { Request, Response } from "express";
import { IPayLoadProps } from "../../../../Shared/Utils/IPayLoad";

import { GetBalanceSerivce } from "./GetBalance.Service";

export class GetBalanceController {
  constructor(private readonly getBalanceSerivce: GetBalanceSerivce) {}

  async handle(request: Request, response: Response) {
    const { id, userName } = (request.body.payload) as IPayLoadProps

    const result = await this.getBalanceSerivce.execute(userName);

    if (result.isLeft()) {
      return response.status(result.value._statusCode).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    return response.status(200).json(result.value);
  }
}