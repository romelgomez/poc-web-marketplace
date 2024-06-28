/*
  Warnings:

  - You are about to drop the column `marketId` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the `Market` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_marketId_fkey";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "marketId";

-- DropTable
DROP TABLE "Market";
