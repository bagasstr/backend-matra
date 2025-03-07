/**
 * @swagger
 * /api/testimoni:
 *   get:
 *     summary: Get all testimoni with pagination
 *     tags: [Testimoni]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: Number of items to retrieve
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
 *                       company:
 *                         type: string
 *                       testi:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       404:
 *         description: Testimoni not found
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/testimoni/{id}:
 *   get:
 *     summary: Get testimoni by ID
 *     tags: [Testimoni]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Testimoni ID
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Testimoni not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/testimoni:
 *   post:
 *     summary: Create new testimoni
 *     tags: [Testimoni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               company:
 *                 type: string
 *               testi:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Testimoni created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/testimoni/{id}:
 *   put:
 *     summary: Update a testimoni by ID
 *     tags: [Testimoni]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Testimoni ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               company:
 *                 type: string
 *               testi:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Testimoni updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Testimoni not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/testimoni/{id}:
 *   delete:
 *     summary: Delete a testimoni by ID
 *     tags: [Testimoni]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Testimoni ID
 *     responses:
 *       200:
 *         description: Testimoni deleted successfully
 *       404:
 *         description: Testimoni not found
 *       500:
 *         description: Internal server error
 */
