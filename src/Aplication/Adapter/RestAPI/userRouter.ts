import { Router, Request, Response } from "express";
import { Auth } from "../../Shared/Middleware/Auth";
import { getBalanceController } from "../User/Methods/GetBalance/GetBalance.Factory";
import { loginUserController } from "../User/Methods/Login/LoginUser.Factory";
import { registerUserController } from "../User/Methods/Register/RegisterUser.Factory";
import { sendTransactionController } from "../User/Methods/SendTransaction/SendTransaction.Factory";

const userRouter = Router();

userRouter.post("/", async (request: Request, response: Response) => {
  return registerUserController.handle(request, response);
})

userRouter.post("/login", async (request: Request, response: Response) => {
  return loginUserController.handle(request, response);
})

userRouter.get("/balance", Auth, async (request: Request, response: Response) => {
  return getBalanceController.handle(request, response);
})

userRouter.post("/transaction", Auth, async (request: Request, response: Response) => {
  return sendTransactionController.handle(request, response);
})

export { userRouter };