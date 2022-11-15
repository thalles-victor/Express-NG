import { IsString, IsNumber, Min, IsOptional, NotContains } from "class-validator"

export class SendTransactionDTO {
  @IsString()
  userName: string;

  @IsString()
  targetUserName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  value: number;
}