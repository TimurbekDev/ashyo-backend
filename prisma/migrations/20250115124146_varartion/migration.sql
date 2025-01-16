-- CreateTable
CREATE TABLE "Varation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Varation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Varation" ADD CONSTRAINT "Varation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
