const express = require('express');
const authRouter = express.Router();
const authController = require('../controller/auth.controller');

authRouter.post('/register',authController.registerController);

authRouter.post('/login',authController.loginController);


authRouter.post('/logout', authController.logoutController);

module.exports = authRouter;