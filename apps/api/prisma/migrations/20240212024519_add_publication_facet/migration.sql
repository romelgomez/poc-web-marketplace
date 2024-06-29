/*
  Warnings:

  - You are about to drop the column `criteria` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `facets` on the `Publication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "criteria";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "facets";

-- CreateTable
CREATE TABLE "PublicationFacet" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "path" TEXT[],
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(6),
    "publicationId" UUID,

    CONSTRAINT "PublicationFacet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PublicationFacet" ADD CONSTRAINT "PublicationFacet_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
