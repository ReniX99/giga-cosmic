/*
  Warnings:

  - A unique constraint covering the columns `[dataset_id]` on the table `osdr_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "osdr_items_dataset_id_key" ON "osdr_items"("dataset_id");
