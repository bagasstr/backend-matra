import { body, validationResult } from "express-validator";

export const vendorValidation = [
  body("namaPerusahaan")
    .trim()
    .notEmpty()
    .withMessage("Nama perusahaan wajib diisi"),
  body("pic").trim().notEmpty().withMessage("PIC wajib diisi"),
  body("whatsapp")
    .trim()
    .notEmpty()
    .isMobilePhone("id-ID", { strictMode: true })
    .withMessage("Nomor Whatsapp wajib diisi"),
  body("produk").isArray(),
  body("produk.*.namaProduk")
    .trim()
    .notEmpty()
    .withMessage("Nama produk wajib diisi"),
  body("produk.*.varian").isArray({ min: 1 }).withMessage("Varian minimal 1"),
  body("produk.*.varian.*.namaVarian")
    .trim()
    .notEmpty()
    .withMessage("Varian wajib diisi"),
  body("produk.*.varian.*.spesifikasi")
    .trim()
    .notEmpty()
    .withMessage("Spesifikasi wajib diisi"),
  body("produk.*.varian.*.hargaSatuan")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("Harga wajib diisi"),
  body("produk.*.varian.*.minPembelian")
    .notEmpty()
    .withMessage("Minimal pembelian wajib diisi"),
];
