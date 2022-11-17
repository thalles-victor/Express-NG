import { IsOptional, IsString } from "class-validator";

export class GetTransactionDTO {
  @IsString()
  userName: string;

  @IsString()
  @IsOptional()
  query?: string;
}