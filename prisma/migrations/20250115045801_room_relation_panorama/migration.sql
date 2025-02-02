-- AlterTable
ALTER TABLE "Panorama" ADD COLUMN     "roomId" INTEGER;

-- AddForeignKey
ALTER TABLE "Panorama" ADD CONSTRAINT "Panorama_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
