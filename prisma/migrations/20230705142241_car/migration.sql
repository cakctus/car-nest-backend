-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "isSuperuser" BOOLEAN NOT NULL DEFAULT false,
    "seller" TEXT NOT NULL DEFAULT 'private',
    "username" TEXT,
    "number" TEXT,
    "countryCode" TEXT NOT NULL DEFAULT '+373',
    "comunicationMethod" TEXT NOT NULL DEFAULT 'phone',
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "userPhoto" TEXT NOT NULL DEFAULT '',
    "userProfilePhoto" TEXT DEFAULT '',
    "isStaff" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "activationLink" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "resetPasswordLink" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Number" (
    "id" SERIAL NOT NULL,
    "number" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "users" INTEGER[] DEFAULT ARRAY[1, 1]::INTEGER[],
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "myId" INTEGER NOT NULL,
    "oponentId" INTEGER NOT NULL,
    "usersId" INTEGER[],
    "userId" INTEGER,
    "oponentReadChat" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "modification" TEXT NOT NULL,
    "modelId" INTEGER NOT NULL,
    "generationId" INTEGER NOT NULL,
    "modificationId" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "steering" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "doors" TEXT,
    "mileage" TEXT NOT NULL,
    "mileageType" TEXT NOT NULL,
    "engineVolume" TEXT NOT NULL,
    "enginePower" TEXT,
    "fuelType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "drive" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusMicrobus" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "steering" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "busBodyType" TEXT NOT NULL,
    "busCategory" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "engineVolume" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "mileageType" TEXT NOT NULL,
    "drive" TEXT,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "BusMicrobus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "brand" TEXT,
    "model" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "steering" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "truckBodyType" TEXT NOT NULL,
    "cabinType" TEXT,
    "drive" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "engineVolume" TEXT NOT NULL,
    "enginPower" TEXT NOT NULL,
    "truckTransmissionsType" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "mileageType" TEXT NOT NULL,
    "loadCapacity" TEXT NOT NULL,
    "loadCapacityType" TEXT NOT NULL,
    "totalWeighTitle" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moto" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "brand" TEXT NOT NULL,
    "model" TEXT,
    "modelId" TEXT,
    "registration" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "motorcycleType" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "engineVolume" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "mileageType" TEXT NOT NULL,
    "enginePower" TEXT,
    "motorcycleTransmission" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Moto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agriculture" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "condition" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "tractorType" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Agriculture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "trailerTypes" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "trailerCondition" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Trailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Construction" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "constructionTypes" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Construction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WheelsTire" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "wheelTireTypes" TEXT,
    "purpose" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT,
    "userId" INTEGER,
    "tireId" INTEGER,
    "discId" INTEGER,

    CONSTRAINT "WheelsTire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disc" (
    "id" SERIAL NOT NULL,
    "discType" TEXT,
    "diameter" TEXT,
    "holeCount" TEXT,
    "brand" TEXT,

    CONSTRAINT "Disc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tire" (
    "id" SERIAL NOT NULL,
    "diameter" TEXT,
    "profileWidth" TEXT,
    "profileHeight" TEXT,
    "season" TEXT,
    "condition" TEXT,
    "brand" TEXT,

    CONSTRAINT "Tire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarParts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "partsCategory" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "modification" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "modificationId" TEXT NOT NULL,
    "partsCondition" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "CarParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TruckParts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "partsCategory" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "partsCondition" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "TruckParts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarMirrorsGlassOptics" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "CarMirrorsGlassOptics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batteries" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "batteryBrands" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "carSeries" TEXT,
    "applicability" TEXT,
    "positiveTerminal" TEXT,
    "housingType" TEXT,
    "electrolyteType" TEXT,
    "terminals" TEXT,
    "maintenanceLevel" TEXT,
    "mountingType" TEXT,
    "partsCondition" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Batteries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoService" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "photo" TEXT[],
    "contacts" TEXT NOT NULL,
    "userId" INTEGER,
    "serviceId" INTEGER,
    "repairId" INTEGER,

    CONSTRAINT "AutoService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "serviceForCars" BOOLEAN NOT NULL DEFAULT false,
    "serviceForTrucks" BOOLEAN NOT NULL DEFAULT false,
    "serviceForAgricultural" BOOLEAN NOT NULL DEFAULT false,
    "serviceForMinibuses" BOOLEAN NOT NULL DEFAULT false,
    "serviceForBuses" BOOLEAN NOT NULL DEFAULT false,
    "serviceForSpecial" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repair" (
    "id" SERIAL NOT NULL,
    "repairEngine" BOOLEAN NOT NULL DEFAULT false,
    "repairChassis" BOOLEAN NOT NULL DEFAULT false,
    "repairSafetySystems" BOOLEAN NOT NULL DEFAULT false,
    "repairSuspension" BOOLEAN NOT NULL DEFAULT false,
    "repairBodyAlignment" BOOLEAN NOT NULL DEFAULT false,
    "repairGlassOptics" BOOLEAN NOT NULL DEFAULT false,
    "repairElectrical" BOOLEAN NOT NULL DEFAULT false,
    "repairTransmission" BOOLEAN NOT NULL DEFAULT false,
    "repairAlarmSystems" BOOLEAN NOT NULL DEFAULT false,
    "repairAirConditioning" BOOLEAN NOT NULL DEFAULT false,
    "repairBodyFrames" BOOLEAN NOT NULL DEFAULT false,
    "repairManagementSystems" BOOLEAN NOT NULL DEFAULT false,
    "repairPainting" BOOLEAN NOT NULL DEFAULT false,
    "repairDetailing" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Number_number_key" ON "Number"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshToken_key" ON "Token"("refreshToken");

-- AddForeignKey
ALTER TABLE "Number" ADD CONSTRAINT "Number_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusMicrobus" ADD CONSTRAINT "BusMicrobus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moto" ADD CONSTRAINT "Moto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agriculture" ADD CONSTRAINT "Agriculture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WheelsTire" ADD CONSTRAINT "WheelsTire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WheelsTire" ADD CONSTRAINT "WheelsTire_discId_fkey" FOREIGN KEY ("discId") REFERENCES "Disc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WheelsTire" ADD CONSTRAINT "WheelsTire_tireId_fkey" FOREIGN KEY ("tireId") REFERENCES "Tire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarParts" ADD CONSTRAINT "CarParts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TruckParts" ADD CONSTRAINT "TruckParts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarMirrorsGlassOptics" ADD CONSTRAINT "CarMirrorsGlassOptics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batteries" ADD CONSTRAINT "Batteries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoService" ADD CONSTRAINT "AutoService_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoService" ADD CONSTRAINT "AutoService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoService" ADD CONSTRAINT "AutoService_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "Repair"("id") ON DELETE SET NULL ON UPDATE CASCADE;
