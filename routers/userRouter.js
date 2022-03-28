// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const registerController = require('../controllers/registerController');
const signInController = require('../controllers/signInController');
const securityQuestionController = require('../controllers/securityQuestionController');
const userController = require('../controllers/userController');
const forgetPasswordController = require('../controllers/forgetPasswordController');
const userRouter = express.Router();

userRouter.post('/register',registerController.createUser);
userRouter.post('/signin', signInController.checkUser);
userRouter.get('/getRandomQuestion',securityQuestionController.getRandomQuestion);
userRouter.post('/checkUser',forgetPasswordController.verifyUser);
userRouter.get('/getQuestion',forgetPasswordController.getSecurityQuestionOfUser);
userRouter.post('/updatePassword',forgetPasswordController.updatePassword);
// Author : Pallavi Cherukupalli (B00887062)
userRouter.get('/userList', userController.getAllusers);

module.exports = userRouter;
