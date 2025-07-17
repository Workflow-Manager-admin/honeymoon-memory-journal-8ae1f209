const express = require('express');
const controller = require('../controllers/user');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User registration, login, and profile
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 */
router.post('/register', controller.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     description: Log out from the app. In this stateless demo system (token = userId), this advises client to forget the token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out (token invalidated client-side)
 */
router.post('/logout', requireAuth, controller.logout);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get your profile
 */
router.get('/profile', requireAuth, controller.profile);

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update profile
 */
router.patch('/profile', requireAuth, controller.updateProfile);

module.exports = router;
