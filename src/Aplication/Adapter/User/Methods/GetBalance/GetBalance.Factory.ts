import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";

import { GetBalanceController } from "./GetBalance.Controller";
import { GetBalanceSerivce } from "./GetBalance.Service";

const userRepository = new UserRepositoryWithPrisma();

export const getBalanceController = new GetBalanceController(
  new GetBalanceSerivce(
    userRepository
  )
)