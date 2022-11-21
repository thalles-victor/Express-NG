import { SendTransactionDTO } from "./SendTransaction.DTO";

export class SendTransactionEntiy {
  userName: string;
  targetUserName: string;
  discription?: string;
  value: number;
  createdAt: Date;

  constructor({
    userName,
    targetUserName,
    description,
    value
  }: SendTransactionDTO) {
    if (userName[0] !== "@") {
      this.userName = "@" + userName;
    } else {
      this.userName = userName;
    }

    if (targetUserName[0] !== "@") {
      this.targetUserName = "@" + targetUserName;
    } else {
      this.targetUserName = targetUserName;
    }


    
    if (description){
       this.discription = description;
    }

    this.value = value;
    this.createdAt = new Date()
  }
}