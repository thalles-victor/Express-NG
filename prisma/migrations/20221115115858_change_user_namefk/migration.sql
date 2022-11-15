/*
  Warnings:

  - You are about to drop the column `user_fk` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName_fk]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName_fk` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_fk_fkey";

-- DropIndex
DROP INDEX "accounts_user_fk_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "user_fk",
ADD COLUMN     "userName_fk" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userName_fk_key" ON "accounts"("userName_fk");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userName_fk_fkey" FOREIGN KEY ("userName_fk") REFERENCES "users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
