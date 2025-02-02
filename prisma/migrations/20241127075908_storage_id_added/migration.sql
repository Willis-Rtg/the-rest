/*
  Warnings:

  - You are about to drop the column `cloudflareId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `streamUrl` on the `File` table. All the data in the column will be lost.
  - Added the required column `storageId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "cloudflareId",
DROP COLUMN "streamUrl",
ADD COLUMN     "storageId" TEXT NOT NULL;
