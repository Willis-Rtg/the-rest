/*
  Warnings:

  - A unique constraint covering the columns `[bannerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_bannerId_key" ON "User"("bannerId");
