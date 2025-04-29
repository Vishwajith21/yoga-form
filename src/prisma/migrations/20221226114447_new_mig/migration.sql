/*
  Warnings:

  - Added the required column `batch_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `batch_id` VARCHAR(191) NOT NULL;
