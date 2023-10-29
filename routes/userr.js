const userController = require('../controllers/user_controller');
const express=require('express');

const router = express.Router();

router.get('/profile',userController.user_controller);

module.exports=router;