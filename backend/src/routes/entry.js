const express = require('express');
const controller = require('../controllers/entry');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Entries
 *   description: Diary entries, searching, sharing, privacy, favorites
 */

/**
 * @swagger
 * /api/entries:
 *   post:
 *     summary: Create a new diary entry
 */
router.post('/', requireAuth, controller.create);

/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: List your entries
 */
router.get('/', requireAuth, controller.list);

/**
 * @swagger
 * /api/entries/search:
 *   get:
 *     summary: Search/filter entries
 */
router.get('/search', requireAuth, controller.search);

/**
 * @swagger
 * /api/entries/:id:
 *   get:
 *     summary: Get entry by id
 */
router.get('/:id', requireAuth, controller.get);

/**
 * @swagger
 * /api/entries/:id:
 *   put:
 *     summary: Update entry
 */
router.put('/:id', requireAuth, controller.update);

/**
 * @swagger
 * /api/entries/:id:
 *   delete:
 *     summary: Delete entry
 */
router.delete('/:id', requireAuth, controller.delete);

/**
 * @swagger
 * /api/entries/:id/share:
 *   post:
 *     summary: Share entry (generate readonly share link)
 */
router.post('/:id/share', requireAuth, controller.share);

/**
 * @swagger
 * /api/entries/shared/:token:
 *   get:
 *     summary: Get shared diary entry by token (public)
 */
router.get('/shared/:token', controller.getShared);

module.exports = router;
