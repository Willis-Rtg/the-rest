/*
  Warnings:

  - A unique constraint covering the columns `[panoramaType]` on the table `Panorama` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Panorama_panoramaType_roomId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Panorama_panoramaType_key" ON "Panorama"("panoramaType");
