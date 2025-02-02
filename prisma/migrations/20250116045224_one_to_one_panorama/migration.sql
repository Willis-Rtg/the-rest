/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Panorama` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roomId` on table `Panorama` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `panoramaId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Panorama" ALTER COLUMN "roomId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "panoramaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Panorama_roomId_key" ON "Panorama"("roomId");
