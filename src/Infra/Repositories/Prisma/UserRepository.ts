import { PrismaClient } from "@prisma/client";
import { RegisterUserEntity } from "../../../Aplication/Adapter/User/Methods/Register/core/RegisterUser.Entity ";
import { UserGlobalRepresentation } from "../../../Aplication/Adapter/User/Methods/User.GlobalRepresentation";
import { IUserRepositoryContract } from "../../core/IUserRepository.Contract";

export class UserRepositoryWithPrisma implements IUserRepositoryContract {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient()
  }

  register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation> {
    const newUser = this.prismaClient.user.create({
      data: {
        userName: userEntity.userName,
        password: userEntity.password,
      }
    })

    return newUser;
  }
}