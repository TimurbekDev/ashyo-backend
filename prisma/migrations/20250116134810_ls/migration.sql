/*
  Warnings:

  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariationOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOption" DROP CONSTRAINT "ProductOption_productItemId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOption" DROP CONSTRAINT "ProductOption_variationOptionId_fkey";

-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "VariationOption" DROP CONSTRAINT "VariationOption_variationId_fkey";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "ProductOption";

-- DropTable
DROP TABLE "Variation";

-- DropTable
DROP TABLE "VariationOption";

-- CreateTable
CREATE TABLE "Varation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Varation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VarationOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "varationId" INTEGER NOT NULL,

    CONSTRAINT "VarationOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Brend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOptions" (
    "id" SERIAL NOT NULL,
    "productItemId" INTEGER NOT NULL,
    "variantOptionId" INTEGER NOT NULL,

    CONSTRAINT "ProductOptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Varation_name_key" ON "Varation"("name");

-- AddForeignKey
ALTER TABLE "Varation" ADD CONSTRAINT "Varation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarationOption" ADD CONSTRAINT "VarationOption_varationId_fkey" FOREIGN KEY ("varationId") REFERENCES "Varation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOptions" ADD CONSTRAINT "ProductOptions_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOptions" ADD CONSTRAINT "ProductOptions_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "VarationOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
