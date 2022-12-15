-- CreateTable
CREATE TABLE "ClockinClockout" (
    "id" SERIAL NOT NULL,
    "clockIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clockOut" TIMESTAMP(3) NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "ClockinClockout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClockinClockout" ADD CONSTRAINT "ClockinClockout_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
