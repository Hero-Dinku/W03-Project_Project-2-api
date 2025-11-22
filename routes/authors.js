const express = require('express');
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authors');

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - birthDate
 *         - nationality
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the author
 *         firstName:
 *           type: string
 *           description: The author's first name
 *         lastName:
 *           type: string
 *           description: The author's last name
 *         fullName:
 *           type: string
 *           description: The author's full name
 *         birthDate:
 *           type: string
 *           format: date
 *           description: The author's birth date
 *         nationality:
 *           type: string
 *           description: The author's nationality
 *         biography:
 *           type: string
 *           description: Brief biography
 *         awards:
 *           type: array
 *           items:
 *             type: string
 *           description: List of awards
 *         isActive:
 *           type: boolean
 *           description: Whether the author is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 673a1b2c3d4e5f6a7b8c9d0f
 *         firstName: Stephen
 *         lastName: King
 *         fullName: Stephen King
 *         birthDate: "1947-09-21"
 *         nationality: American
 *         biography: American author of horror novels
 *         awards: ["National Book Award"]
 *         isActive: true
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: The list of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
 */
router.get('/', getAllAuthors);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: The author description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       400:
 *         description: Invalid ID format
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The author was successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was updated
 *       404:
 *         description: Author not found
 *       400:
 *         description: Validation error
 */
router.put('/:id', updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: The author was deleted
 *       404:
 *         description: Author not found
 */
router.delete('/:id', deleteAuthor);

module.exports = router;
