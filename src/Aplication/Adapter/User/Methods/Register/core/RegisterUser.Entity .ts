import * as bcrypt  from "bcrypt"
import { RegisterUserDTO } from "./RegisterUser.DTO"
import { HASH_SALT } from "../../../../../Shared/Utils/ENV";

export class RegisterUserEntity {
  userName: string
  password: string;

  constructor({
    userName,
    password
  } : RegisterUserDTO) {
    if (!(userName[0] === "@")) {
      this.userName = ("@" + userName);
    }

    this.password = bcrypt.hashSync(password, HASH_SALT);
  }
}