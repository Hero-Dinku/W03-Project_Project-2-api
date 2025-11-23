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
 *           description: The auto-generated id of the author
 *         firstName:
 *           type: string
 *           description: The author's first name
 *         lastName:
 *           type: string
 *           description: The author's last name
 *         birthDate:
 *           type: string
 *           format: date
 *           description: The author's birth date
 *         nationality:
 *           type: string
 *           description: The author's nationality
 *         biography:
 *           type: string
 *           description: Brief biography of the author
 *         awards:
 *           type: array
 *           items:
 *             type: string
 *           description: List of awards received
 *         isActive:
 *           type: boolean
 *           description: Whether the author is currently active
 *       example:
 *         _id: 65123456789abcdef0123457
 *         firstName: Stephen
 *         lastName: King
 *         birthDate: "1947-09-21"
 *         nationality: American
 *         biography: Stephen King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.
 *         awards: ["National Book Award", "Bram Stoker Award"]
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
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author description by id
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
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
 *         description: The author id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       400:
 *         description: Validation error or invalid ID
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
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author was deleted
 *       404:
 *         description: Author not found
 *       400:
 *         description: Invalid ID format
 */
router.delete('/:id', deleteAuthor);

module.exports = router;