import { Router, Request, Response } from "express";
import { buildCheckFunction } from "express-validator";
import { loginUserController } from "../User/Methods/Login/LoginUser.Factory";
import { registerUserController } from "../User/Methods/Register/RegisterUser.Factory";

const userRouter = Router();

userRouter.post("/", async (request: Request, response: Response) => {
  return registerUserController.handle(request, response);
})

userRouter.post("/login", async (request: Request, response: Response) => {
  return loginUserController.handle(request, response);
})

export { userRouter };