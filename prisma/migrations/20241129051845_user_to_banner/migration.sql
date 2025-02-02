/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Banner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Banner_userId_key" ON "Banner"("userId");

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
