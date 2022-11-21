import { validate } from "class-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { LoginUserDTO } from "./core/LoginUser.DTO";

import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";
import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { JWT_SECRET, TIME_EXPIRATION_TOKEN } from "../../../../Shared/Utils/ENV";
import { UserGlobalRepresentation } from "../User.GlobalRepresentation";

interface LoginResponse {
  token: string;
  user: Partial<UserGlobalRepresentation>
}

type Response = Either<CustomErrorResponse, LoginResponse>;

export class LoginUserService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute({ userName, password }: LoginUserDTO): Promise<Response> {
    const userDTO = Object.assign(new LoginUserDTO(), {
      userName,
      password,
    });

    const errors = await validate(userDTO);

    if (errors.length > 0) {
      return left(new CustomErrorResponse("Paramiter mal formated", 400));
    };


    const user = await this.userRepository.getByUserName(userName);
    if (!user) {
      return left(new CustomErrorResponse("User not found", 400));
    }


    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return left(new CustomErrorResponse("Password is no valid", 401));
    }

    const payload = {
      id: user.id_pk,
      userName: user.userName
    }

    const token = jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: TIME_EXPIRATION_TOKEN
      }
    )

    return right({
      token: token,
      user: {
        name: user.name,
        userName: user.userName,
        avatar: user.avatar,
      }
    })

  }
}