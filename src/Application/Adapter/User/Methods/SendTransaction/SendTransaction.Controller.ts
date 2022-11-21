import { Request, Response } from "express"
import { IPayLoadProps } from "../../../../Shared/Utils/IPayLoad";
import { SendTransactionService } from "./SendTransaction.Service";

export class SendTransactionController {
  constructor(private readonly sendTransactionSerivce: SendTransactionService) {}

  async handle(request: Request, response: Response) {
    const { userName } = (request.body.payload) as IPayLoadProps;
    const { transaction: { targetUserName, value, description } } =  request.body;

    //Validate body params in DTO entity

    const result = await this.sendTransactionSerivce.execute({
      targetUserName,
      value,
      userName,
      description
    })

    if (result.isLeft()) {
      return response.status(400).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    return response.status(201).json(result.value)
  }
}