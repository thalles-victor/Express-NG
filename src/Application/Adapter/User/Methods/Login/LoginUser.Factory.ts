import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";

import { LoginUserController } from "./LoginUser.Controller";
import { LoginUserService } from "./LoginUser.Service";

const userRepository = new UserRepositoryWithPrisma();

export const loginUserController = new LoginUserController(
  new LoginUserService(
    userRepository
  )
)