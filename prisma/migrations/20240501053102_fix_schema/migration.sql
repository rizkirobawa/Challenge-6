/*
  Warnings:

  - You are about to drop the column `userId` on the `pictures` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_userId_fkey";

-- AlterTable
ALTER TABLE "pictures" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
