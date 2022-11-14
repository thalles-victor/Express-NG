import { RegisterUserEntity } from "../../Aplication/Adapter/User/Methods/Register/core/RegisterUser.Entity ";
import { UserGlobalRepresentation } from "../../Aplication/Adapter/User/Methods/User.GlobalRepresentation";

export interface IUserContractRepository {
  register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation>;
}