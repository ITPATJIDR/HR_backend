/*
  Warnings:

  - You are about to drop the column `ID_Card` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[IDcard]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `IDcard` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_ID_Card_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "ID_Card",
ADD COLUMN     "IDcard" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SocialSecurityRate" (
    "id" SERIAL NOT NULL,
    "employeeRate" DOUBLE PRECISION NOT NULL,
    "ownerRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SocialSecurityRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_IDcard_key" ON "Employee"("IDcard");
