const express = require('express');
const controller = require('../controllers/gallery');
const { requireAuth } = require('../middleware/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery uploads and retrieval
 */

/**
 * @swagger
 * /api/gallery/upload:
 *   post:
 *     summary: Upload a photo or video
 */
router.post('/upload', requireAuth, upload.single('file'), controller.upload);

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: List uploaded files
 */
router.get('/', requireAuth, controller.list);

/**
 * @swagger
 * /api/gallery/:id:
 *   get:
 *     summary: Get a file by ID
 */
router.get('/:id', requireAuth, controller.get);

module.exports = router;
