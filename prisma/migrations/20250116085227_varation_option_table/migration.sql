-- CreateTable
CREATE TABLE "VarationOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "varationId" INTEGER NOT NULL,

    CONSTRAINT "VarationOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VarationOption" ADD CONSTRAINT "VarationOption_varationId_fkey" FOREIGN KEY ("varationId") REFERENCES "Varation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
