/*
  Warnings:

  - You are about to drop the column `coomment` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "coomment",
ADD COLUMN     "comment" TEXT NOT NULL;
