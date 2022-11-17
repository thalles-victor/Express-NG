import * as bcrypt  from "bcrypt"
import { RegisterUserDTO } from "./RegisterUser.DTO"
import { HASH_SALT } from "../../../../../Shared/Utils/ENV";

export class RegisterUserEntity {
  name: string;
  userName: string
  password: string;
  avatar: string

  constructor({
    name,
    userName,
    password,
    avatar
  } : RegisterUserDTO) {
    this.name = name;

    if (!(userName[0] === "@")) {
      this.userName = ("@" + userName);
    } else {
      this.userName = userName;
    }

    this.password = bcrypt.hashSync(password, HASH_SALT);
    this.avatar = avatar;
  }
}