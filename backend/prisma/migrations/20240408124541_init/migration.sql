/*
  Warnings:

  - You are about to drop the `collisions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipalities_geojson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collisions` DROP FOREIGN KEY `collisions_municipalityId_fkey`;

-- DropTable
DROP TABLE `collisions`;

-- DropTable
DROP TABLE `municipalities_geojson`;

-- CreateTable
CREATE TABLE `ongevallen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `nisCode` VARCHAR(191) NOT NULL,
    `regionCollisionFr` VARCHAR(191) NOT NULL,
    `regionCollisionNl` VARCHAR(191) NOT NULL,
    `provCollisionFr` VARCHAR(191) NOT NULL,
    `provCollisionNl` VARCHAR(191) NOT NULL,
    `muntyCollisionFr` VARCHAR(191) NOT NULL,
    `muntyCollisionNl` VARCHAR(191) NOT NULL,
    `xCoord` DOUBLE NOT NULL,
    `yCoord` DOUBLE NOT NULL,
    `crosswayCode` VARCHAR(191) NULL,
    `crosswayFr` VARCHAR(191) NULL,
    `crosswayNl` VARCHAR(191) NULL,
    `weatherCode` INTEGER NULL,
    `weatherFr` VARCHAR(191) NULL,
    `weatherNl` VARCHAR(191) NULL,
    `roadConditionCode` INTEGER NULL,
    `roadConditionFr` VARCHAR(191) NULL,
    `roadConditionNl` VARCHAR(191) NULL,
    `buildUpAreaCode` INTEGER NULL,
    `buildUpAreaFr` VARCHAR(191) NULL,
    `buildUpAreaNl` VARCHAR(191) NULL,
    `lightConditionCode` INTEGER NULL,
    `lightConditionFr` VARCHAR(191) NULL,
    `lightConditionNl` VARCHAR(191) NULL,
    `roadTypeCode` INTEGER NULL,
    `roadTypeFr` VARCHAR(191) NULL,
    `roadTypeNl` VARCHAR(191) NULL,
    `classAccidentsCode` INTEGER NULL,
    `classAccidentsFr` VARCHAR(191) NULL,
    `classAccidentsNl` VARCHAR(191) NULL,
    `roadUserType1Code` INTEGER NULL,
    `roadUserType1Fr` VARCHAR(191) NULL,
    `roadUserType1Nl` VARCHAR(191) NULL,
    `roadUserType2Code` INTEGER NULL,
    `roadUserType2Fr` VARCHAR(191) NULL,
    `roadUserType2Nl` VARCHAR(191) NULL,
    `collisionTypeCode` INTEGER NULL,
    `collisionTypeFr` VARCHAR(191) NULL,
    `collisionTypeNl` VARCHAR(191) NULL,
    `obstaclesCode` INTEGER NULL,
    `obstaclesFr` VARCHAR(191) NULL,
    `obstaclesNl` VARCHAR(191) NULL,
    `municipalityId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gemeenten` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nisCode` VARCHAR(191) NOT NULL,
    `nameDutch` VARCHAR(191) NOT NULL,
    `nameFrench` VARCHAR(191) NOT NULL,
    `geoJSON` JSON NOT NULL,

    UNIQUE INDEX `gemeenten_nisCode_key`(`nisCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ongevallen` ADD CONSTRAINT `ongevallen_municipalityId_fkey` FOREIGN KEY (`municipalityId`) REFERENCES `gemeenten`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
