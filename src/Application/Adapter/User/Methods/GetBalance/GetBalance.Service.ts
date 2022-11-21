import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";

interface IResponseProps {
  balance: number;
}

type Response = Either<CustomErrorResponse, IResponseProps>;

export class GetBalanceSerivce {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(userName: string): Promise<Response> {
    const user = await this.userRepository.getByUserName(userName);

    if (!user) {
      return left(new CustomErrorResponse("User not found", 400))
    }

    const balance = await this.userRepository.getBalance(user.userName);

    if (balance === null) { //Balance pode ser 0 e entrar nesse bloco
      return left(new CustomErrorResponse("Balance not found", 400));
    }

    return right({
      balance: balance
    })
  }
}