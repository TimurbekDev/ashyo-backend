/*
  Warnings:

  - You are about to drop the column `productId` on the `Like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_productId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "productId",
ADD COLUMN     "productItemId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
