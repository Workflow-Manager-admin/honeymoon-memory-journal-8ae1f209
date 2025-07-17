const express = require('express');
const healthController = require('../controllers/health');
const userRoutes = require('./user');
const entryRoutes = require('./entry');
const galleryRoutes = require('./gallery');

const router = express.Router();

// Health endpoint
router.get('/', healthController.check.bind(healthController));

// Main app REST endpoints
router.use('/api/users', userRoutes);
router.use('/api/entries', entryRoutes);
router.use('/api/gallery', galleryRoutes);

module.exports = router;
