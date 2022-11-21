import { IsString, IsNumber, Min, IsOptional, NotContains, IsNotEmpty } from "class-validator"

export class SendTransactionDTO {
  @IsNotEmpty({ message: "[userName] cannot be empty" })
  @IsString({ message: "[userName] needs to be a string" })
  userName: string;

  @IsNotEmpty({ message: "[targetUserName] cannot be empty" })
  @IsString({ message: "[targetUserName] needs to be a string" })
  targetUserName: string;

  @IsNotEmpty({ message: "[targetUserName] cannot be empty" })
  @IsString({ message: "[description] needs to be a string" })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: "[value] cannot be empty" })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1, { message: "[value] is has to be at least" })
  value: number;
}