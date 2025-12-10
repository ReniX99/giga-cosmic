-- CreateTable
CREATE TABLE "osdr_items" (
    "id" SERIAL NOT NULL,
    "dataset_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raw" JSONB NOT NULL,

    CONSTRAINT "osdr_items_pkey" PRIMARY KEY ("id")
);
