import { IsString, Length, Min, NotContains } from "class-validator"
export class RegisterUserDTO {
  @IsString()
  @Length(3)
  @NotContains("@")
  userName: string

  @IsString()
  @Length(8)
  password: string
}