import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";

import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { RegisterUserDTO } from "./core/RegisterUser.DTO";

import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";
import { JWT_SECRET, TIME_EXPIRATION_TOKEN } from "../../../../Shared/Utils/ENV";
import { RegisterUserEntity } from "./core/RegisterUser.Entity";


interface TokenResponse {
  token: string
}

type Response = Either<CustomErrorResponse, TokenResponse>;

export class RegisterUserService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute({ name, userName, password, avatar }: RegisterUserDTO): Promise<Response> {
    const userIsValid = Object.assign(new RegisterUserDTO, {
      name,
      userName,
      password,
      avatar
    });

    /* Verify paramiter is correct */

    
    const errors = await validate(userIsValid);
    
    if (errors.length > 0) {
      return left(new CustomErrorResponse("paramiter mal formated", 400));
    }

    /*----------------------------*/
    

    /*Check if user already exist */

    const userAlredyExist = await this.userRepository.getByUserName(userName);
    if (userAlredyExist) {
      return left(new CustomErrorResponse("User alredy exist", 400))
    }

    /*----------------------------*/

    /* Cerate a new User */

    const userEntity = new RegisterUserEntity(userIsValid)

    const newUser = await this.userRepository.register(userEntity);

    /*----------------------------*/


    /* Build token */
    const payload = {
      id: newUser.id_pk,
      userName: newUser.userName
    }

    const token = jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: TIME_EXPIRATION_TOKEN
      }
    )

    /*----------------------------*/


    return right({
      token: token
    })

  }
}