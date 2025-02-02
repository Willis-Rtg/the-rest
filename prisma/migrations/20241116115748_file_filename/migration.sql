/*
  Warnings:

  - The values [svg] on the enum `FileType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `filename` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FileType_new" AS ENUM ('video', 'photo', 'svgxml');
ALTER TABLE "File" ALTER COLUMN "type" TYPE "FileType_new" USING ("type"::text::"FileType_new");
ALTER TYPE "FileType" RENAME TO "FileType_old";
ALTER TYPE "FileType_new" RENAME TO "FileType";
DROP TYPE "FileType_old";
COMMIT;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "filename" TEXT NOT NULL;
