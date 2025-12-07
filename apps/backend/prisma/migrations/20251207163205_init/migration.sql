-- CreateTable
CREATE TABLE "iss_logs" (
    "id" SERIAL NOT NULL,
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceUrl" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "iss_logs_pkey" PRIMARY KEY ("id")
);
