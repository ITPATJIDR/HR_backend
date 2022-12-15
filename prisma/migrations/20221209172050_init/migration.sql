/*
  Warnings:

  - The `Role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Role",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'HR';

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "ID_Card" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3) NOT NULL,
    "salaryBase" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "relationship" TEXT NOT NULL,
    "child" INTEGER NOT NULL,
    "employeeType" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "typeofPay" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "departmentName" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_ID_Card_key" ON "Employee"("ID_Card");

-- CreateIndex
CREATE UNIQUE INDEX "Department_departmentName_key" ON "Department"("departmentName");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
