import { Request, Response } from "express";
import { CheckIfNameIsValidService } from "./CheckIfNameIsValid.Service";

export class CheckIfNameIsValidController {
  constructor(private readonly checkIfNameIsValidService: CheckIfNameIsValidService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userName } = request.params;

    if (!userName) {
      return response.status(200).json({
        exist: false
     })
    }

    const result = await this.checkIfNameIsValidService.execute(userName);

    return response.status(200).json({
      exist: result
   })
  }
};