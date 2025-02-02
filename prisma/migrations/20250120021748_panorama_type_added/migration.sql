-- CreateEnum
CREATE TYPE "PanoramaType" AS ENUM ('sea', 'oceaon', 'barbecue', 'garden', 'prologue');

-- AlterTable
ALTER TABLE "Panorama" ADD COLUMN     "PanoramaType" "PanoramaType";
