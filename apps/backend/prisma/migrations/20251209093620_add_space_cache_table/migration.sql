-- CreateTable
CREATE TABLE "space_cache" (
    "id" SERIAL NOT NULL,
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "space_cache_pkey" PRIMARY KEY ("id")
);
