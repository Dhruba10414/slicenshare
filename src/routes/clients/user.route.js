const express = require("express");
const router = express.Router();
const path = require('path');
const authController =  require(path.join(process.cwd(), 'src/controllers/client/auth.controller.js'));
// const loginUser = require('../controllers/auth_controller/login.controller')
// const IMServiceGuard = require('../middleWares/auth/authMiddleware')
// const getAdminUser = require("../controllers/get_user/get-user.controller")
router.post("/register", authController.userRegistration);
router.post("/login",authController.loginUser)
module.exports = router;