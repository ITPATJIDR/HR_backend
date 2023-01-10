/*
  Warnings:

  - The values [LERDER] on the enum `EmployeeRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmployeeRole_new" AS ENUM ('LEADER', 'SENIOR', 'JUNIOR');
ALTER TABLE "Employee" ALTER COLUMN "position" DROP DEFAULT;
ALTER TABLE "Employee" ALTER COLUMN "position" TYPE "EmployeeRole_new" USING ("position"::text::"EmployeeRole_new");
ALTER TYPE "EmployeeRole" RENAME TO "EmployeeRole_old";
ALTER TYPE "EmployeeRole_new" RENAME TO "EmployeeRole";
DROP TYPE "EmployeeRole_old";
ALTER TABLE "Employee" ALTER COLUMN "position" SET DEFAULT 'JUNIOR';
COMMIT;
