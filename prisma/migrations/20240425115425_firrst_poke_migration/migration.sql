-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abilities" TEXT[],
    "types" TEXT[],
    "sprite" TEXT NOT NULL,
    "shinySprite" TEXT NOT NULL,
    "locations" TEXT[],
    "learnset" TEXT[],
    "stats" JSONB NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "baseExperience" INTEGER NOT NULL,
    "forms" TEXT[],
    "heldItems" TEXT[],
    "generation" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "moves" TEXT[],
    "characteristics" JSONB NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
