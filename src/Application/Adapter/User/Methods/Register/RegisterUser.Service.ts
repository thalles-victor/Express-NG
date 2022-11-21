import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";

import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { RegisterUserDTO } from "./core/RegisterUser.DTO";

import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";
import { JWT_SECRET, TIME_EXPIRATION_TOKEN } from "../../../../Shared/Utils/ENV";
import { RegisterUserEntity } from "./core/RegisterUser.Entity";
import { UserGlobalRepresentation } from "../User.GlobalRepresentation";
import { IMessagingContract } from "../../../../../Infra/Messaging/Kafka/core/IMessagingContract";


interface RegisterResponse {
  token: string;
  user: Partial<UserGlobalRepresentation>;
}

type Response = Either<CustomErrorResponse, RegisterResponse>;

export class RegisterUserService {
  constructor(
    private readonly userRepository: IUserRepositoryContract,
    // private readonly kafkaMessaging: IMessagingContract
  ) {}

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
      return left(new CustomErrorResponse("paramiter mal formated: " + errors.concat().toString(), 400));
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


    // await this.kafkaMessaging.sendMessage({
    //   topic: "newUsers",
    //   message: newUser.userName
    // })

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
      token: token,
      user: {
        name: newUser.name,
        userName: newUser.userName,
        avatar: newUser.avatar
      }
    })

  }
}