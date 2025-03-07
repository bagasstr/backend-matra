/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get all portfolio with pagination
 *     tags: [Portfolio]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       content:
 *                         type: string
 *                       category:
 *                         type: string
 *                       gambar:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *       404:
 *         description: Tidak ada data
 */

/**
 * @swagger
 * /api/portfolio/{id}:
 *   get:
 *     summary: Get a portfolio project by ID or slug
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The portfolio ID or slug
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       content:
 *                         type: string
 *                       category:
 *                         type: string
 *                       gambar:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *       404:
 *         description: Portfolio tidak ada
 */

/**
 * @swagger
 * /api/portfolio:
 *   post:
 *     summary: Create a new portfolio project
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               mitraKlien:
 *                 type: string
 *               ringkasan:
 *                 type: string
 *               tanggalPelaksanaan:
 *                 type: string
 *               lokasi:
 *                 type: string
 *               tipeBangunan:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Portfolio berhasil ditambahkan
 *       400:
 *         description: gagal menambahkan portfolio
 */

/**
 * @swagger
 * /api/portfolio/{id}:
 *   delete:
 *     summary: Delete a portfolio project
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The portfolio ID or slug
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 * /api/portfolio/{id}:
 *   put:
 *     summary: Update a portfolio project
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The portfolio ID or slug
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               mitraKlien:
 *                 type: string
 *               ringkasan:
 *                 type: string
 *               tanggalPelaksanaan:
 *                 type: string
 *               lokasi:
 *                 type: string
 *               tipeBangunan:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not Found
 */
