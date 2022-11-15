-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_fk_fkey";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_fk_fkey" FOREIGN KEY ("user_fk") REFERENCES "users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
