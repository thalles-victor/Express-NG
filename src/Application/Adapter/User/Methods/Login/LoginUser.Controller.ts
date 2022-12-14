import { Request, Response } from "express";

import { LoginUserService } from "./LoginUser.Service";

export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService)  {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user: { userName,  password  } } = request.body;

    const result = await this.loginUserService.execute({ userName, password });

    if (result.isLeft()) {
      return response.status(result.value._statusCode).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    return response.status(200).json(result.value);
  }
}