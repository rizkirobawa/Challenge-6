/*
  Warnings:

  - Made the column `description` on table `pictures` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pictures" ALTER COLUMN "description" SET NOT NULL;
