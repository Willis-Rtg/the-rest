-- DropForeignKey
ALTER TABLE "Beach" DROP CONSTRAINT "Beach_userId_fkey";

-- DropForeignKey
ALTER TABLE "Panorama" DROP CONSTRAINT "Panorama_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Beach" ADD CONSTRAINT "Beach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panorama" ADD CONSTRAINT "Panorama_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
