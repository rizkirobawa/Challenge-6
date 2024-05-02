-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "occupation" TEXT,
    "avatar_url" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pictures" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "picture_id" TEXT NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pictures_title_key" ON "pictures"("title");

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
