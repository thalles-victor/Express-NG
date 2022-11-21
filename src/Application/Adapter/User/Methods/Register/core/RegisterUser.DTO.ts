import { IsNotEmpty, IsString, Length, Min, NotContains } from "class-validator"
export class RegisterUserDTO {
  @IsString({ message: "[name] is string" })
  @IsNotEmpty({ message: "[name] required" })
  name: string;

  @IsString({ message: "[userName] is string" })
  @Length(3)
  @NotContains("@")
  @IsNotEmpty({ message: "[userName] required" })
  userName: string

  @IsString({ message: "[password] is string and " })
  @Length(8)
  @IsNotEmpty({ message: "password required" })
  password: string

  @IsString()
  @IsNotEmpty({ message: "[avatar] required" })
  avatar: string;
}