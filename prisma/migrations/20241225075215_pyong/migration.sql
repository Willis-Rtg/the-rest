/*
  Warnings:

  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.
  - Added the required column `pyong` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `structure` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "type",
ADD COLUMN     "pyong" INTEGER NOT NULL,
ADD COLUMN     "structure" TEXT NOT NULL;
