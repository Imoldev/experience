-- CreateTable
CREATE TABLE `Equipment` (
    `tenant_id` BIGINT NOT NULL,

    PRIMARY KEY (`tenant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `tenant_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tenant_id`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Extension` (
    `tenant_id` BIGINT NOT NULL,
    `asset_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tenant_id`, `asset_name`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `Equipment`(`tenant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Extension` ADD CONSTRAINT `Extension_tenant_id_asset_name_fkey` FOREIGN KEY (`tenant_id`, `asset_name`) REFERENCES `Asset`(`tenant_id`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;
