import { describe, it, expect } from "vitest";
import { UserRepositoryWithPrisma } from "../../../../../../Infra/Repositories/Prisma/UserRepository";
import { CustomErrorResponse } from "../../../../../Shared/Utils/Errors/Error";
import { RegisterUserService } from "../RegisterUser.Service";

const userRepository = new UserRepositoryWithPrisma()
const registerUserService = new RegisterUserService(userRepository);

describe("sum", () => {
  const userName = "thalles";
  const password = "minhasenha123";

  it("Tente registrar um usuário que já existe", async () => {
    const result = await registerUserService.execute({ userName, password });

    expect(result.isLeft).toEqual(true)
  })

  
})