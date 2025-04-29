-- AlterTable
ALTER TABLE `payment` MODIFY `expiresAt` DATETIME(3) NULL,
    MODIFY `isActive` BOOLEAN NULL;
