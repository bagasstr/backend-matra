-- CreateEnum
CREATE TYPE "SatuanProduk" AS ENUM ('PCS', 'KG', 'METER', 'LITER', 'PACK');

-- CreateEnum
CREATE TYPE "JenisPajak" AS ENUM ('INCLUDEPPN', 'EXCLUDE_PPN', 'NO_PPN');

-- CreateEnum
CREATE TYPE "TipePengiriman" AS ENUM ('FRANCO', 'LOCO');

-- CreateEnum
CREATE TYPE "JenisPembayaran" AS ENUM ('CBD', 'COD', 'TEMPO', 'LAINNYA');

-- CreateTable
CREATE TABLE "Artikel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "refrensi" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,
    "seoId" INTEGER,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioProyek" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mitraKlien" TEXT NOT NULL,
    "ringkasan" TEXT NOT NULL,
    "mulaiPelaksanaan" TEXT NOT NULL,
    "selesaiPelaksanaan" TEXT NOT NULL,
    "tipeBangunan" TEXT NOT NULL,
    "tanggalPelaksanaan" TEXT NOT NULL,
    "thumbnail" TEXT,
    "lokasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioProyek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GambarProyek" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "portfolioProyekId" INTEGER,

    CONSTRAINT "GambarProyek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seo" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "image" TEXT,
    "metaDescription" TEXT NOT NULL,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produkMaterial" (
    "id" SERIAL NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "hargaBarang" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL,
    "minimalPembelian" INTEGER NOT NULL,
    "kelipatanPembelian" INTEGER NOT NULL,
    "dimensiUnit" TEXT NOT NULL,
    "berat" INTEGER NOT NULL,
    "merek" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "subKategori" TEXT NOT NULL,
    "jumlahUnit" INTEGER NOT NULL,
    "jenisPengiriman" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,

    CONSTRAINT "produkMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimasiPengiriman" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "durasi" TEXT NOT NULL,
    "produkMaterialId" INTEGER,

    CONSTRAINT "estimasiPengiriman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pasokanArea" (
    "id" SERIAL NOT NULL,
    "kota" TEXT NOT NULL,
    "produkMaterialId" INTEGER,

    CONSTRAINT "pasokanArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gambarProduk" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produkMaterialId" INTEGER,

    CONSTRAINT "gambarProduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "namaPerusahaan" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "namaProduk" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "document" TEXT,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Varian" (
    "id" SERIAL NOT NULL,
    "namaVarian" TEXT,
    "spesifikasi" TEXT NOT NULL,
    "hargaSatuan" DOUBLE PRECISION NOT NULL,
    "satuanProduk" "SatuanProduk" NOT NULL,
    "hargaDiskon" DOUBLE PRECISION,
    "minPembelian" INTEGER NOT NULL,
    "produkId" INTEGER NOT NULL,

    CONSTRAINT "Varian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengiriman" (
    "id" SERIAL NOT NULL,
    "tipe" "TipePengiriman" NOT NULL,
    "area" TEXT NOT NULL,
    "jadwal" INTEGER NOT NULL,
    "produkId" INTEGER NOT NULL,

    CONSTRAINT "Pengiriman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pajak" (
    "id" SERIAL NOT NULL,
    "jenisPajak" TEXT NOT NULL,
    "produkId" INTEGER NOT NULL,

    CONSTRAINT "Pajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id" SERIAL NOT NULL,
    "jenisPembayaran" TEXT NOT NULL,
    "tempo" TEXT NOT NULL,
    "lainnya" TEXT NOT NULL,
    "produkId" INTEGER NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PromoType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "produkId" INTEGER NOT NULL,
    "PromoTypeId" INTEGER NOT NULL,
    "judul" TEXT,
    "deskripsi" TEXT,
    "diskon" DECIMAL(5,2),
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimoni" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "testi" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimoni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_slug_key" ON "Artikel"("slug");

-- CreateIndex
CREATE INDEX "Artikel_category_idx" ON "Artikel" USING HASH ("category");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioProyek_slug_key" ON "PortfolioProyek"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "produkMaterial_id_key" ON "produkMaterial"("id");

-- CreateIndex
CREATE UNIQUE INDEX "produkMaterial_slug_key" ON "produkMaterial"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "estimasiPengiriman_id_key" ON "estimasiPengiriman"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pasokanArea_id_key" ON "pasokanArea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gambarProduk_id_key" ON "gambarProduk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pengiriman_produkId_key" ON "Pengiriman"("produkId");

-- CreateIndex
CREATE UNIQUE INDEX "Pajak_produkId_key" ON "Pajak"("produkId");

-- CreateIndex
CREATE UNIQUE INDEX "Pembayaran_produkId_key" ON "Pembayaran"("produkId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoType_name_key" ON "PromoType"("name");

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GambarProyek" ADD CONSTRAINT "GambarProyek_portfolioProyekId_fkey" FOREIGN KEY ("portfolioProyekId") REFERENCES "PortfolioProyek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimasiPengiriman" ADD CONSTRAINT "estimasiPengiriman_produkMaterialId_fkey" FOREIGN KEY ("produkMaterialId") REFERENCES "produkMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pasokanArea" ADD CONSTRAINT "pasokanArea_produkMaterialId_fkey" FOREIGN KEY ("produkMaterialId") REFERENCES "produkMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gambarProduk" ADD CONSTRAINT "gambarProduk_produkMaterialId_fkey" FOREIGN KEY ("produkMaterialId") REFERENCES "produkMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Varian" ADD CONSTRAINT "Varian_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengiriman" ADD CONSTRAINT "Pengiriman_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pajak" ADD CONSTRAINT "Pajak_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_PromoTypeId_fkey" FOREIGN KEY ("PromoTypeId") REFERENCES "PromoType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
