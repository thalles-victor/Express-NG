import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";

import { GetUserInformationPublicController } from "./GetUserInformationPublic.Controller";
import { GetUserInformationPublicService } from "./GetUserInformationPublic.Service";

const userRepository = new UserRepositoryWithPrisma();

export const getUserInfoController = new GetUserInformationPublicController(
  new GetUserInformationPublicService(
    userRepository
  )
)