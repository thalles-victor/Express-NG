/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Transactions";

-- CreateTable
CREATE TABLE "accounts" (
    "id_pk" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 1000,
    "user_fk" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id_pk")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id_pk" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "debitedAccountId" TEXT NOT NULL,
    "creditedAccountId" TEXT NOT NULL,
    "accountId_pk" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_user_fk_key" ON "accounts"("user_fk");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_fk_fkey" FOREIGN KEY ("user_fk") REFERENCES "users"("id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_pk_fkey" FOREIGN KEY ("accountId_pk") REFERENCES "accounts"("id_pk") ON DELETE SET NULL ON UPDATE CASCADE;
