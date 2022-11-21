import { UserRepositoryWithPrisma } from "../../../../../Infra/Repositories/Prisma/UserRepository";
import { GetVoucherController } from "./GetVoucher.Controller"
import { GetVoucherService } from "./GetVoucher.Service";
import { VoucherPDFGenerate } from "./voucherGenerate";

export const getVoucherController = new GetVoucherController(
  new GetVoucherService(
    new UserRepositoryWithPrisma(),
    new VoucherPDFGenerate()
  )
)