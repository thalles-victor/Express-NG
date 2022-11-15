import { IsString } from "class-validator";

export class LoginUserDTO {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}