/*
  Warnings:

  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date,time]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Time" DROP CONSTRAINT "Time_availabilityId_fkey";

-- DropIndex
DROP INDEX "Availability_date_key";

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Time";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_date_time_key" ON "Availability"("date", "time");
