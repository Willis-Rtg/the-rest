/*
  Warnings:

  - Added the required column `extra` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilities` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('base', 'middle', 'busy');

-- CreateEnum
CREATE TYPE "Week" AS ENUM ('weekday', 'friday', 'weekend');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "extra" TEXT NOT NULL,
ADD COLUMN     "facilities" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "roomType";

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "season" "Season" NOT NULL,
    "week" "Week" NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
