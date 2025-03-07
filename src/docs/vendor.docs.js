/**
 * @swagger
 * /api/vendor:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   namaPerusahaan:
 *                     type: string
 *                   pic:
 *                     type: string
 *                   whatsapp:
 *                     type: string
 *                   produk:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         namaProduk:
 *                           type: string
 *                         kategori:
 *                           type: string
 *                         document:
 *                           type: string
 *                         varian:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               namaVarian:
 *                                 type: string
 *                               spesifikasi:
 *                                 type: string
 *                               hargaSatuan:
 *                                 type: number
 *                               satuanProduk:
 *                                 type: string
 *                               hargaDiskon:
 *                                 type: number
 *                               minPembelian:
 *                                 type: number
 *                         pengiriman:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                tipe:
 *                                  type: string
 *                                area:
 *                                  type: string
 *                                jadwal:
 *                                  type: string
 *                         pajak:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               jenisPajak:
 *                                 type: string
 *                         pembayaran:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                jenisPembayaran:
 *                                  type: string
 *                                tempo:
 *                                   type: string
 *                                lainnya:
 *                                   type: string
 *
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendor/{id}:
 *   get:
 *     summary: Get a vendor by ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendor:
 *   post:
 *     summary: Create a new vendor
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                namaProduk:
 *                  type: string
 *                kategori:
 *                  type: string
 *                document:
 *                  type: string
 *                varian:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      namaVarian:
 *                        type: string
 *                      spesifikasi:
 *                        type: string
 *                      hargaSatuan:
 *                        type: number
 *                      satuanProduk:
 *                        type: string
 *                      hargaDiskon:
 *                        type: number
 *                      minPembelian:
 *                        type: number
 *                pengiriman:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tipe:
 *                         type: string
 *                       area:
 *                         type: string
 *                       jadwal:
 *                         type: string
 *                pajak:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      jenisPajak:
 *                        type: string
 *                pembayaran:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       jenisPembayaran:
 *                         type: string
 *                       tempo:
 *                          type: string
 *                       lainnya:
 *                          type: string
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/vendor/{id}:
 *   delete:
 *     summary: Delete a vendor by ID
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */
