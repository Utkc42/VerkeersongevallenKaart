-- AlterTable
ALTER TABLE `collisions` ADD COLUMN `municipalityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `collisions` ADD CONSTRAINT `collisions_municipalityId_fkey` FOREIGN KEY (`municipalityId`) REFERENCES `municipalities_geojson`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
