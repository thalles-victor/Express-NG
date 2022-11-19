import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";

import { CheckIfNameIsValidController } from "./CheckIfNameIsValid.Controlle";
import { CheckIfNameIsValidService } from "./CheckIfNameIsValid.Service";

const userRepository = new UserRepositoryWithPrisma();

export const checkIfNameIsValidController = new CheckIfNameIsValidController(
  new CheckIfNameIsValidService(
    userRepository
  )
)