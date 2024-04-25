-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "baseExperience" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
