import { validate } from "class-validator"

import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { RegisterUserDTO } from "./core/RegisterUser.DTO";

import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";

type Response = Either<CustomErrorResponse, any>;

export class RegisterUserService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute({ userName, password }: RegisterUserDTO): Promise<Response> {
    const userIsValid = Object.assign(new RegisterUserDTO, {
      userName,
      password
    });

    try {
      validate(userIsValid);
    } catch(error) {
      console.log(error)
      return left(new CustomErrorResponse("error while create user", 400))
    }

    const newUser = await this.userRepository.register(userIsValid);

    return right(newUser)

  }
}