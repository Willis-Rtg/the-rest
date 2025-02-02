-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "panoramaId" INTEGER;

-- CreateTable
CREATE TABLE "Panorama" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Panorama_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_panoramaId_fkey" FOREIGN KEY ("panoramaId") REFERENCES "Panorama"("id") ON DELETE SET NULL ON UPDATE CASCADE;
