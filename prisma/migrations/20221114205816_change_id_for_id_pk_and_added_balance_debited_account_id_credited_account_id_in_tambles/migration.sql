/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Transactions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - The required column `id_pk` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `creditedAccountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debitedAccountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - The required column `id_pk` was added to the `Transactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id_pk` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_pk" TEXT NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id_pk");

-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "creditedAccountId" TEXT NOT NULL,
ADD COLUMN     "debitedAccountId" TEXT NOT NULL,
ADD COLUMN     "id_pk" TEXT NOT NULL,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id_pk");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_pk" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id_pk");
