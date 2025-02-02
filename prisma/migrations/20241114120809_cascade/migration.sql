-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_beachId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_panoramaId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_roomId_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_beachId_fkey" FOREIGN KEY ("beachId") REFERENCES "Beach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_panoramaId_fkey" FOREIGN KEY ("panoramaId") REFERENCES "Panorama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
