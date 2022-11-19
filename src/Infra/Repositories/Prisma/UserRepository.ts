import { PrismaClient } from "@prisma/client";
import { AccountGlobalRepresentation } from "../../../Aplication/Adapter/User/Methods/Account.GlobalRepresentation";
import { RegisterUserEntity } from "../../../Aplication/Adapter/User/Methods/Register/core/RegisterUser.Entity";
import { SendTransactionEntiy } from "../../../Aplication/Adapter/User/Methods/SendTransaction/core/SendTransaction.Entity";
import { TransactionsGlobalRepresentation } from "../../../Aplication/Adapter/User/Methods/Transaction.GlobalRepresentation";
import { UserGlobalRepresentation } from "../../../Aplication/Adapter/User/Methods/User.GlobalRepresentation";
import { IUserRepositoryContract, Query } from "../../core/IUserRepository.Contract";



export class UserRepositoryWithPrisma implements IUserRepositoryContract {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient()
  }


  
  async register(userEntity: RegisterUserEntity): Promise<UserGlobalRepresentation> {
    const newUser = await this.prismaClient.user.create({
      data: {
        name: userEntity.name,
        userName: userEntity.userName,
        password: userEntity.password,
        avatar: userEntity.avatar,
        Account: {
          create: {
            balance: 100,
          }
        }
      }
    });
  

    return newUser;
  }

  async getByUserName(userName: string): Promise<UserGlobalRepresentation | null> {
    if (userName[0] === "@") {
      const user = await this.prismaClient.user.findUnique({
        where: {
          userName: userName
        }
      })

      return user;
    }

    const user = await this.prismaClient.user.findUnique({
      where: {
        userName: "@" + userName
      }
    })

    return user;
  }

  async getBalance(userName: string): Promise<number | null> {
    const account = await this.prismaClient.account.findUnique({
      where: {
        userName_fk: userName
      }
    });

    if (!account) {
      return null;
    }

    const balance = account.balance;

    return balance;
  }

  async sendTransaction(transactionEntity: SendTransactionEntiy): Promise<TransactionsGlobalRepresentation | null> {

    const account = await this.prismaClient.account.findUnique({
      where: {
        userName_fk: transactionEntity.userName 
      }
    })

    if (!account) return null;

    const targetaccount = await this.prismaClient.account.findUnique({
      where: { userName_fk : transactionEntity.targetUserName }
    })

    if (!targetaccount) return null;

    await this.prismaClient.account.update({
      where: {
        userName_fk: account?.userName_fk
      },
      data: {
        balance: account?.balance - transactionEntity.value
      }
    })

    await this.prismaClient.account.update({
      where: {
        userName_fk: transactionEntity.targetUserName
      },
       data: {
        balance: targetaccount.balance + transactionEntity.value
       }
    })

    let  userWithTransaction = await this.prismaClient.user.findUnique({
      where: {
        userName: transactionEntity.userName
      },
      include: {
        Account: true
      }
    });

    if (!userWithTransaction) {
      return null;
    }

    const transaction = await this.prismaClient.transactions.create({
      data: {
        debitedAccountId: transactionEntity.userName,
        creditedAccountId: transactionEntity.targetUserName,
        accountId_pk: userWithTransaction?.Account?.id_pk,
        value: transactionEntity.value
      }
    })

    return transaction;
  }

  async getUserByTransaction(accountId: string, transactionID: string): Promise<UserGlobalRepresentation | null> {
    const transaction = await this.prismaClient.transactions.findUnique({
      where: { id_pk: transactionID }
    });

    if (!transaction) return null;

    const account = await this.prismaClient.account.findUnique({
      where: {
        id_pk: transaction.debitedAccountId
      }
    })

    if (!account) return null;
    
    const user = await this.prismaClient.user.findUnique({
      where: {
        id_pk: account.userName_fk
      }
    });

    return null;
  }

  async getTransactionByTransactionID(id: string): Promise<TransactionsGlobalRepresentation | null> {
    const transaction = await this.prismaClient.transactions.findUnique({
      where: { id_pk: id }
    })

    if (!transaction) return null;

    return transaction;
  }

  async getTransaction(userName: string, query?: Query): Promise<TransactionsGlobalRepresentation[]> {
    if (!query) {
      const transactions = await this.prismaClient.transactions.findMany({
        where: {
          OR: [
            { creditedAccountId: userName },
            { debitedAccountId: userName }
          ]
        },
      })
      console.log("1", transactions)
  
      return transactions;
    }

    const transactions = await this.prismaClient.transactions.findMany({
      where: {
        OR: [
          { creditedAccountId: userName },
          { debitedAccountId: userName }  
        ]
      },
      orderBy: {
        createdAt: query.date,
        
      }
    })
    console.log("2", transactions)

    return transactions;

  }


}

