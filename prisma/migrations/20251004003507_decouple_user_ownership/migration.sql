-- DropIndex
DROP INDEX `campaigns_clientId_fkey` ON `campaigns`;

-- DropIndex
DROP INDEX `campaigns_userId_fkey` ON `campaigns`;

-- DropIndex
DROP INDEX `clients_userId_fkey` ON `clients`;

-- DropIndex
DROP INDEX `generated_contents_campaignId_fkey` ON `generated_contents`;

-- DropIndex
DROP INDEX `scheduled_posts_generatedContentId_fkey` ON `scheduled_posts`;

-- AlterTable
ALTER TABLE `campaigns` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `clients` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `generated_contents` ADD CONSTRAINT `generated_contents_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scheduled_posts` ADD CONSTRAINT `scheduled_posts_generatedContentId_fkey` FOREIGN KEY (`generatedContentId`) REFERENCES `generated_contents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
