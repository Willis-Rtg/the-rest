/*
  Warnings:

  - Added the required column `index` to the `Panorama` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Panorama" ADD COLUMN     "index" INTEGER NOT NULL;
