const express = require("express");
const router = express.Router();
const path = require('path');
const adminAuthController =  require(path.join(process.cwd(), 'src/controllers/admin/auth/admin-auth.controller.js'));


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management APIs
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Log in as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: string
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: Admin Name
 *                 email:
 *                   type: string
 *                   example: admin@example.com
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
 *       401:
 *         description: Invalid credentials
 */

router.post("/register", adminAuthController.registerAdmin);
router.post("/login",adminAuthController.loginAdmin)
module.exports = router;