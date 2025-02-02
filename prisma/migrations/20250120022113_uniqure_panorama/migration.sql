/*
  Warnings:

  - You are about to drop the column `PanoramaType` on the `Panorama` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[panoramaType,roomId]` on the table `Panorama` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Panorama" DROP COLUMN "PanoramaType",
ADD COLUMN     "panoramaType" "PanoramaType";

-- CreateIndex
CREATE UNIQUE INDEX "Panorama_panoramaType_roomId_key" ON "Panorama"("panoramaType", "roomId");
