import { AccountGlobalRepresentation } from "../../Aplication/Adapter/User/Methods/Account.GlobalRepresentation";
import { RegisterUserEntity } from "../../Aplication/Adapter/User/Methods/Register/core/RegisterUser.Entity";
import { UserGlobalRepresentation } from "../../Aplication/Adapter/User/Methods/User.GlobalRepresentation";

export interface IUserRepositoryContract {
  register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation>;
  getByUserName(userName: string): Promise<UserGlobalRepresentation | null>;
  getBalanceByUserID(userId: string): Promise<number | null>;
}