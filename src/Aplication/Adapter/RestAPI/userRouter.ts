import { Router, Request, Response } from "express";
import { Auth } from "../../Shared/Middleware/Auth";
import { checkIfNameIsValidController } from "../User/Methods/CheckIfNameIsValid/CheckIfNameIsValid.Factory";
import { getBalanceController } from "../User/Methods/GetBalance/GetBalance.Factory";
import { getUserInfoController } from "../User/Methods/GetInformationPublic/GetUserInformationPublic.Factory";
import { getVoucherController } from "../User/Methods/GetVoucher/GetVoucher.Factory";
import { loginUserController } from "../User/Methods/Login/LoginUser.Factory";
import { registerUserController } from "../User/Methods/Register/RegisterUser.Factory";
import { sendTransactionController } from "../User/Methods/SendTransaction/SendTransaction.Factory";

import { getTransactionController } from "../User/Methods/GetTransaction/GetTransaction.Factory";

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

userRouter.get("/public/:userName", Auth, async (request: Request, response: Response) => {
  return getUserInfoController.handle(request, response);
})

userRouter.get("/exist/:userName", async (request: Request, response: Response) => {
  return checkIfNameIsValidController.handle(request, response);
})

userRouter.post("/transaction", Auth, async (request: Request, response: Response) => {
  return sendTransactionController.handle(request, response);
})

userRouter.get("/transaction/:userName",  async (request: Request, response: Response) => {
  return getTransactionController.handle(request, response);
})



userRouter.get("/transaction/voucher/:transactionID", async (request: Request, response: Response) => {
  return getVoucherController.handle(request, response)
})

export { userRouter };