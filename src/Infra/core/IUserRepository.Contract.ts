import { AccountGlobalRepresentation } from "../../Aplication/Adapter/User/Methods/Account.GlobalRepresentation";
import { RegisterUserEntity } from "../../Aplication/Adapter/User/Methods/Register/core/RegisterUser.Entity";
import { SendTransactionEntiy } from "../../Aplication/Adapter/User/Methods/SendTransaction/core/SendTransaction.Entity";
import { TransactionsGlobalRepresentation } from "../../Aplication/Adapter/User/Methods/Transaction.GlobalRepresentation";
import { UserGlobalRepresentation } from "../../Aplication/Adapter/User/Methods/User.GlobalRepresentation";

export interface IUserRepositoryContract {
  register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation>;
  getByUserName(userName: string): Promise<UserGlobalRepresentation | null>;
  getBalance(userName: string): Promise<number | null>;
  sendTransaction(transactionEntity: SendTransactionEntiy): Promise<TransactionsGlobalRepresentation | null>;
}