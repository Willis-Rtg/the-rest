-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('video', 'photo', 'svg');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('base', 'middle', 'busy');

-- CreateEnum
CREATE TYPE "Week" AS ENUM ('weekday', 'friday', 'weekend');

-- CreateEnum
CREATE TYPE "PanoramaType" AS ENUM ('sea', 'oceaon', 'barbecue', 'garden', 'prologue');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "ID" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bannerId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "type" "FileType" NOT NULL,
    "storageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "beachId" INTEGER,
    "roomId" INTEGER,
    "panoramaId" INTEGER,
    "bannerId" INTEGER,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beach" (
    "id" SERIAL NOT NULL,
    "payload" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "structure" TEXT NOT NULL,
    "pyong" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "maxQuantity" INTEGER NOT NULL,
    "addPrice" INTEGER NOT NULL,
    "facilities" TEXT NOT NULL,
    "extra" TEXT NOT NULL,
    "panoramaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "season" "Season" NOT NULL,
    "week" "Week" NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Panorama" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER,
    "panoramaType" "PanoramaType",

    CONSTRAINT "Panorama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ID_key" ON "User"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "File_panoramaId_index_key" ON "File"("panoramaId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "Panorama_roomId_key" ON "Panorama"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Panorama_panoramaType_key" ON "Panorama"("panoramaType");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_beachId_fkey" FOREIGN KEY ("beachId") REFERENCES "Beach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_panoramaId_fkey" FOREIGN KEY ("panoramaId") REFERENCES "Panorama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beach" ADD CONSTRAINT "Beach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panorama" ADD CONSTRAINT "Panorama_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
