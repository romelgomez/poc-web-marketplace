/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the `PublicationFacet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PublicationVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- DropForeignKey
ALTER TABLE "PublicationFacet" DROP CONSTRAINT "PublicationFacet_publicationId_fkey";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "categoryId",
DROP COLUMN "locationId",
DROP COLUMN "mode",
ADD COLUMN     "visibility" "PublicationVisibility" NOT NULL DEFAULT 'PUBLIC';

-- DropTable
DROP TABLE "PublicationFacet";
