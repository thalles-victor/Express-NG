import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";

import { GetTransactionController } from "./GetTransaction.Controller";
import { GetTransactionService } from "./GetTransaction.Service";

const userRepository = new UserRepositoryWithPrisma()

export const getTransactionController = new GetTransactionController(
  new GetTransactionService(
    userRepository
  )
)