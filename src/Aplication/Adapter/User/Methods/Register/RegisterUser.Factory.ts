import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository"

import { RegisterUserController } from "./RegisterUser.Controller"
import { RegisterUserService } from "./RegisterUser.Service"

const userRepository = new UserRepositoryWithPrisma();

export const registerUserController = new RegisterUserController(
  new RegisterUserService(
    userRepository
  )
)