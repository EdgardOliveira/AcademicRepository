-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `knowledgeArea` VARCHAR(191) NOT NULL,
    `pdf` LONGBLOB NOT NULL,
    `publication` ENUM('PENDING', 'APPROVED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `articles_title_content_publication_createdAt_idx`(`title`, `content`, `publication`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
