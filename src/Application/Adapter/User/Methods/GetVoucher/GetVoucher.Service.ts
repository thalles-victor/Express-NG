import util from "util"
import { IUserRepositoryContract } from "../../../../../Infra/core/IUserRepository.Contract";
import { VoucherPDFGenerate } from "./voucherGenerate";

import { Either, left, right } from "../../../../Shared/Utils/Errors/Either";
import { CustomErrorResponse } from "../../../../Shared/Utils/Errors/Error";

type Response = Either<CustomErrorResponse, PDFKit.PDFDocument>;

export class GetVoucherService {
  
  constructor(
    private readonly userRepository: IUserRepositoryContract,
    private readonly voucherGenerate: VoucherPDFGenerate
  ) {
  }

  async execute(transactionID: string): Promise<Response> {
    const transaction = await this.userRepository.getTransactionByTransactionID(transactionID);

    if (!transaction) {
      return left(new CustomErrorResponse("Transactin not found", 404))
    }

    const {
      debitedAccountId,
      creditedAccountId,
      accountId_pk,
      createdAt,
      id_pk,
      value,
    } = transaction;

    const userSender = await this.userRepository.getByUserName(debitedAccountId);
    const userRecive = await this.userRepository.getByUserName(creditedAccountId);

    if (!userSender || !userRecive) {
      return left(new CustomErrorResponse("Users who participated in the transactions not found", 404))
    }

    const { userName: userNameSender, name: nameSender } = userSender;
    const { userName: userNameRecive, name: nameRecive } = userRecive;


    const docpdf = this.voucherGenerate.execute({
      nameSender: nameSender,
      userNameSender: userNameSender,
      nameRecive: nameRecive,
      userNameRecive: userNameRecive,
      createdAt: createdAt,
      transactionID: id_pk,
      value: value
    });

    return right(docpdf);
  }

  geneRateVouter() {}
}