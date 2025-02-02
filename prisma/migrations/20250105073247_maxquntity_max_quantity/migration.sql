/*
  Warnings:

  - Added the required column `addPrice` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxQuantity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "addPrice" INTEGER NOT NULL,
ADD COLUMN     "maxQuantity" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
