/*
  Warnings:

  - The primary key for the `ProductOptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `ProductOptions` table. All the data in the column will be lost.
  - Added the required column `productItemId` to the `ProductOptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOptions" DROP CONSTRAINT "ProductOptions_productId_fkey";

-- AlterTable
ALTER TABLE "ProductOptions" DROP CONSTRAINT "ProductOptions_pkey",
DROP COLUMN "productId",
ADD COLUMN     "productItemId" INTEGER NOT NULL,
ADD CONSTRAINT "ProductOptions_pkey" PRIMARY KEY ("productItemId", "variantOptionId");

-- AddForeignKey
ALTER TABLE "ProductOptions" ADD CONSTRAINT "ProductOptions_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
