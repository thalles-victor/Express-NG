import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";

import { SendTransactionController } from "./SendTransaction.Controller";
import { SendTransactionService } from "./SendTransaction.Service";

const userRepository = new UserRepositoryWithPrisma();

export const sendTransactionController = new SendTransactionController(
  new SendTransactionService(
    userRepository
  )
)