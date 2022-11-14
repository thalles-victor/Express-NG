import { Router, Request, Response } from "express";
import { registerUserController } from "../User/Methods/Register/RegisterUser.Factory";

const userRouter = Router();

userRouter.post("/", async (request: Request, response: Response) => {
  return registerUserController.handle(request, response);
})

export { userRouter };