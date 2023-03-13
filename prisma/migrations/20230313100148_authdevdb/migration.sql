/*
  Warnings:

  - A unique constraint covering the columns `[resetTokenExpires]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_resetTokenExpires_key" ON "users"("resetTokenExpires");
