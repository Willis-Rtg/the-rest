/*
  Warnings:

  - Added the required column `bannerIndex` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "bannerIndex" INTEGER NOT NULL;
