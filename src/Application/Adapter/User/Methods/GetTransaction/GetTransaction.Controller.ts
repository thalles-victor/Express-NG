import { Request, Response } from "express";
import { IPayLoadProps } from "../../../../Shared/Utils/IPayLoad";


import { GetTransactionService } from "./GetTransaction.Service";

export class GetTransactionController {
  constructor(private readonly getTransactionService: GetTransactionService) {}

  async handle(request: Request, response: Response) {
    const { userName } = (request.body.payload) as IPayLoadProps;

    const query = request.query

    if (! (query.date === "asc" || query.date === "desc" || query.date === undefined)) {
      return response.status(400).json({
        statusCode: 400,
        message: "the <date> is only allowed [asc], [desc] or [undefined]"
      });
    }

    if (! (query.cash == "in" || query.cash === "out" || query.cash || query.cash === undefined)) {
      return response.status(400).json({
        statusCode: 400,
        message: "the <cash> is only allowed [in], [out] or [undefined]"
      });
    }

    const result = await this.getTransactionService.execute(userName, query);

    if (result.isLeft()) {
      return response.status(result.value._statusCode).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    return response.status(200).json(result.value)
  }
}