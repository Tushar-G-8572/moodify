const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controller/user.controller');

const userRouter = express.Router();

userRouter.get('/',authMiddleware.authUser,userController.checkBlackList);


module.exports = userRouter;