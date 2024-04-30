/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `pictures` table. All the data in the column will be lost.
  - You are about to drop the column `judul` on the `pictures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `pictures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "pictures_judul_key";

-- AlterTable
ALTER TABLE "pictures" DROP COLUMN "deskripsi",
DROP COLUMN "judul",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pictures_title_key" ON "pictures"("title");
