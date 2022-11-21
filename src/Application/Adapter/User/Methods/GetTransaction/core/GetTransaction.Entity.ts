import { GetTransactionDTO } from "./GetTransaction.DTO";

export class GetTransactionEntity {
  userName: string;
  query?: string;

  constructor({ userName, query }: GetTransactionDTO) {
    if (userName[0] !== "@"){
      this.userName = userName;
    } else {
      this.userName = userName;
    }
  }
}