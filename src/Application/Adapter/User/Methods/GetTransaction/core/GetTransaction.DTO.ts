import { IsOptional, IsString } from "class-validator";

export interface Query {
  date?: "asc" | "desc";
  cash?: "in" | "out";
}

export class GetTransactionDTO {
  @IsString()
  userName: string;

  @IsString()
  @IsOptional()
  query?: Query;
}