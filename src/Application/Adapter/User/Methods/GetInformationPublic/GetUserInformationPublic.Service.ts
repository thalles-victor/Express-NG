import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";

import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";
import { UserGlobalRepresentation } from "../User.GlobalRepresentation";

type Response = Either<CustomErrorResponse, Partial<UserGlobalRepresentation>>

export class GetUserInformationPublicService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(userName: string): Promise<Response> {
    const user = await this.userRepository.getByUserName(userName);

    if (!user) {
      return left(new CustomErrorResponse("User not found", 400))
    }

    return right({
      name: user.name,
      userName: user.userName,
      avatar: user.avatar
    })
  }
}