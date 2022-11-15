import { PrismaClient } from "@prisma/client";
import { RegisterUserEntity } from "../../../Aplication/Adapter/User/Methods/Register/core/RegisterUser.Entity";
import { UserGlobalRepresentation } from "../../../Aplication/Adapter/User/Methods/User.GlobalRepresentation";
import { IUserRepositoryContract } from "../../core/IUserRepository.Contract";

export class UserRepositoryWithPrisma implements IUserRepositoryContract {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation> {
    const newUser = await this.prismaClient.user.create({
      data: {
        userName: userEntity.userName,
        password: userEntity.password,
      }
    })

    return newUser;
  }

  async getByUserName(userName: string): Promise<UserGlobalRepresentation | null> {
    if (userName[0] === "@") {
      const user = await this.prismaClient.user.findUnique({
        where: {
          userName: userName
        }
      })

      return user;
    }

    const user = await this.prismaClient.user.findUnique({
      where: {
        userName: "@" + userName
      }
    })

    return user;
  }

}