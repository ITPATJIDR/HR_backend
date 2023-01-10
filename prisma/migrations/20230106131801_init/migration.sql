-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('LERDER', 'SENIOR', 'JUNIOR');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "position" "EmployeeRole" NOT NULL DEFAULT 'JUNIOR';
