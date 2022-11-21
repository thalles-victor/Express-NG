import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}