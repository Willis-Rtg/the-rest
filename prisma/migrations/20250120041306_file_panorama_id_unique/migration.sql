/*
  Warnings:

  - A unique constraint covering the columns `[panoramaId,index]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_panoramaId_index_key" ON "File"("panoramaId", "index");
