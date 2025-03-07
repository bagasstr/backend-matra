/**
 * @swagger
 * /api/artikel:
 *   get:
 *     summary: Get all artikel
 *     tags: [Artikel]
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
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *
 */

/**
 * @swagger
 * /api/artikel/{id}:
 *   get:
 *     summary: Get artikel by id
 *     tags: [Artikel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artikel id
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     content:
 *                       type: string
 *                     category:
 *                       type: string
 *                     gambar:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 */

/**
 * @swagger
 * /api/artikel:
 *   post:
 *     summary: Create artikel
 *     tags: [Artikel]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               gambar:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               thumbnail:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 */

/**
 * @swagger
 * /api/artikel/{slug}:
 *   put:
 *     summary: Update artikel
 *     tags: [Artikel]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The artikel slug
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               gambar:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               thumbnail:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
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
 */

/**
 * @swagger
 * /api/artikel/{id}:
 *   delete:
 *     summary: Delete artikel by id
 *     tags: [Artikel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artikel id
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
 */
