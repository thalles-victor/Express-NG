import { PrismaClient } from "@prisma/client";
import { Query } from "../../../Application/Adapter/User/Methods/GetTransaction/core/GetTransaction.DTO";
import { RegisterUserEntity } from "../../../Application/Adapter/User/Methods/Register/core/RegisterUser.Entity";
import { SendTransactionEntiy } from "../../../Application/Adapter/User/Methods/SendTransaction/core/SendTransaction.Entity";
import { TransactionsGlobalRepresentation } from "../../../Application/Adapter/User/Methods/Transaction.GlobalRepresentation";
import { UserGlobalRepresentation } from "../../../Application/Adapter/User/Methods/User.GlobalRepresentation";
import { IUserRepositoryContract } from "../../core/IUserRepository.Contract";



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


  async getTransactionByTransactionID(id: string): Promise<TransactionsGlobalRepresentation | null> {
    const transaction = await this.prismaClient.transactions.findUnique({
      where: { id_pk: id }
    })

    if (!transaction) return null;

    return transaction;
  }

  async getTransaction(userName: string, query?: Query): Promise<TransactionsGlobalRepresentation[]> {
    if (!query?.date) {
      const transactions = await this.prismaClient.transactions.findMany({
        where: {
          OR: [
            { creditedAccountId: userName },
            { debitedAccountId: userName }
          ],
        },
        orderBy: {
          createdAt: "desc"
        }
      })

      if (query?.cash === "out") {
        const outTransactions = transactions.filter((transaction) => {
          return transaction.debitedAccountId === userName;
        })
  
        return outTransactions;
      }
  
      if  (query?.cash === "in") {
        const inTransactions = transactions.filter((transaction) => {
          return transaction.creditedAccountId === userName
        });
  
        return inTransactions
      }

    
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
    });

    if (query.cash === "out") {
      const outTransactions = transactions.filter((transaction) => {
        return transaction.debitedAccountId === userName;
      })

      return outTransactions;
    }

    if  (query.cash === "in") {
      const inTransactions = transactions.filter((transaction) => {
        return transaction.creditedAccountId === userName
      });

      return inTransactions
    }
    
    return transactions;
  }
}

