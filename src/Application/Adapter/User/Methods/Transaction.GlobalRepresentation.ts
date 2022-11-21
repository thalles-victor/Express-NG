export class TransactionsGlobalRepresentation {
  id_pk: string;
  createdAt: Date;
  debitedAccountId: string;
  creditedAccountId: string;
  accountId_pk: string | null;
  value: number;
}