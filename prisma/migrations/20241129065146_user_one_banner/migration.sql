/*
  Warnings:

  - You are about to drop the column `userId` on the `Banner` table. All the data in the column will be lost.
  - Added the required column `bannerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Banner" DROP CONSTRAINT "Banner_userId_fkey";

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
