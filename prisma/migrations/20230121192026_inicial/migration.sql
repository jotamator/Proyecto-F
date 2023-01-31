-- CreateTable
CREATE TABLE "link" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "link_url_key" ON "link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "link_shortUrl_key" ON "link"("shortUrl");
