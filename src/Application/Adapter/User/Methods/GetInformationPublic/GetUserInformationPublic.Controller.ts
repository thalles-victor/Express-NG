import { Request, Response } from "express";

import { GetUserInformationPublicService } from "./GetUserInformationPublic.Service";

export class GetUserInformationPublicController {
  constructor(private readonly getUserInformationPublicService: GetUserInformationPublicService) {}

  async handle(request: Request, response: Response) {
    const { userName } = request.params;

    if (!userName) {
      return response.status(404).json({
        statusCode: 404,
        message: "user not found"
      })
    }

    const result = await this.getUserInformationPublicService.execute(userName)

    if (result.isLeft()) {
      return response.status(result.value._statusCode).json({
        statusCode: result.value._statusCode,
        message: result.value._message
      })
    }

    return response.status(200).json({
      user: result.value
    })
  }
}