import { Request, Response } from "express";
import { Query } from "../../../../../Infra/core/IUserRepository.Contract";


import { GetTransactionService } from "./GetTransaction.Service";

export class GetTransactionController {
  constructor(private readonly getTransactionService: GetTransactionService) {}

  async handle(request: Request, response: Response) {
    const { userName } = request.params;
    const query = (request.query) as Query;

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