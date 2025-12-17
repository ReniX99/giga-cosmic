-- CreateTable
CREATE TABLE "telemetries" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "is_rain" BOOLEAN NOT NULL,
    "temperature" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,

    CONSTRAINT "telemetries_pkey" PRIMARY KEY ("id")
);
