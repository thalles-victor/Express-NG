import { AccountGlobalRepresentation } from "../../Application/Adapter/User/Methods/Account.GlobalRepresentation";
import { Query } from "../../Application/Adapter/User/Methods/GetTransaction/core/GetTransaction.DTO";
import { RegisterUserEntity } from "../../Application/Adapter/User/Methods/Register/core/RegisterUser.Entity";
import { SendTransactionEntiy } from "../../Application/Adapter/User/Methods/SendTransaction/core/SendTransaction.Entity";
import { TransactionsGlobalRepresentation } from "../../Application/Adapter/User/Methods/Transaction.GlobalRepresentation";
import { UserGlobalRepresentation } from "../../Application/Adapter/User/Methods/User.GlobalRepresentation";



export interface IUserRepositoryContract {
  register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation>;
  getByUserName(userName: string): Promise<UserGlobalRepresentation | null>;
  getBalance(userName: string): Promise<number | null>;
  sendTransaction(transactionEntity: SendTransactionEntiy): Promise<TransactionsGlobalRepresentation | null>;
  getTransaction(userName: string, query?: Query): Promise<TransactionsGlobalRepresentation[]>;
  getTransactionByTransactionID(id: string): Promise<TransactionsGlobalRepresentation | null>;
}