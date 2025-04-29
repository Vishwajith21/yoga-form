/*
  Warnings:

  - Added the required column `price` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `expiresAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
