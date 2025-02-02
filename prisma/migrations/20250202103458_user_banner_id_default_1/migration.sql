/*
  Warnings:

  - Made the column `bannerId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bannerId" SET NOT NULL,
ALTER COLUMN "bannerId" SET DEFAULT 1;
