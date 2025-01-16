/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Varation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Varation_name_key" ON "Varation"("name");
