-- DropForeignKey
ALTER TABLE "ClockinClockout" DROP CONSTRAINT "ClockinClockout_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- AlterTable
ALTER TABLE "ClockinClockout" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "endAt" DROP NOT NULL,
ALTER COLUMN "departmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClockinClockout" ADD CONSTRAINT "ClockinClockout_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
