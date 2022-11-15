import { IsNotEmpty, IsString, Length, Min, NotContains } from "class-validator"
export class RegisterUserDTO {
  @IsString()
  @Length(3)
  @NotContains("@")
  @IsNotEmpty()
  userName: string

  @IsString()
  @Length(8)
  @IsNotEmpty()
  password: string
}