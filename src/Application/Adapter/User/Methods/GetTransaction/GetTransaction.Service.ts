import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";
import { TransactionsGlobalRepresentation } from "../Transaction.GlobalRepresentation";
import { Query } from "./core/GetTransaction.DTO";

interface ResponseProps { 
  transactions: TransactionsGlobalRepresentation[];
}

type Response = Either<CustomErrorResponse, ResponseProps>;

export class GetTransactionService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(userName: string, query?: Query): Promise<Response> {
    const transactions = await this.userRepository.getTransaction(userName, query);

    if (!transactions) {
      return left(new CustomErrorResponse("Transactions not found", 404));
    }

    return right({ transactions })
  }
}