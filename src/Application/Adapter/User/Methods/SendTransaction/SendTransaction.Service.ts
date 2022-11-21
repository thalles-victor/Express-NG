import { validate } from "class-validator";
import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";
import { TransactionsGlobalRepresentation } from "../Transaction.GlobalRepresentation";
import { SendTransactionDTO } from "./core/SendTransaction.DTO";
import { SendTransactionEntiy } from "./core/SendTransaction.Entity";

interface IResponseProps {
  transaction: TransactionsGlobalRepresentation
}

type Response = Either<CustomErrorResponse, IResponseProps>

export class SendTransactionService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute({
    userName,
    targetUserName,
    value,
    description
  }: SendTransactionDTO): Promise<Response> {
    const transactionDTO = Object.assign(new SendTransactionDTO(), {
      userName,
      targetUserName,
      value,
      description
    })

    const errors = await validate(transactionDTO);

    if (errors.length > 0) {
      return left(new CustomErrorResponse("paramiters mal formated: " + errors.toLocaleString(), 400));
    }

    const transactionEntity = new SendTransactionEntiy(transactionDTO);

    if (transactionEntity.userName === transactionEntity.targetUserName) {
      return left(new CustomErrorResponse("It is not possible to send a transaction to yourself", 400))
    }

    const balance = await this.userRepository.getBalance(userName);
    if (!balance) return left(new CustomErrorResponse("Balance not enough"))
    if (balance < value) {
      return left(new CustomErrorResponse("Balance not enough", 400))
    }

    const targetUserExist = await this.userRepository.getByUserName(transactionEntity.targetUserName);
    if (!targetUserExist) {
      return left(new CustomErrorResponse("Target not found", 400));
    }
    
    const transaction = await this.userRepository.sendTransaction(transactionEntity);

    if (!transaction) {
      return left(new CustomErrorResponse("Error while create transaction"))
    }

    return right({
      transaction: transaction
    })
  }
}