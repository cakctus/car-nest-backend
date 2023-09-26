-- AlterTable
ALTER TABLE "AutoService" ALTER COLUMN "contacts" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Batteries" ALTER COLUMN "contacts" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CarMirrorsGlassOptics" ALTER COLUMN "contacts" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CarParts" ALTER COLUMN "contacts" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TruckParts" ALTER COLUMN "contacts" DROP NOT NULL;
