/*
  Warnings:

  - A unique constraint covering the columns `[judul]` on the table `pictures` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pictures_judul_key" ON "pictures"("judul");
