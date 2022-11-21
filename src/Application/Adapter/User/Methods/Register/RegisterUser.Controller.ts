import { Request, Response } from "express"
import { RegisterUserService } from "./RegisterUser.Service";

export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  async handle(request: Request, response: Response) {
    const { user: { name ,userName, password, avatar } } = request.body;

    const result = await this.registerUserService.execute({
      name,
      userName,
      password,
      avatar
    });

    if (result.isLeft()) {
      return response.status(result.value._statusCode).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    return response.status(201).json(result.value)
  }
}