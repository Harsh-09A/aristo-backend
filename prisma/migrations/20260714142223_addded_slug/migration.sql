/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_slug_key" ON "Agent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_slug_key" ON "Developer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");
