const express=require('express');
const router = express.Router();

router.use('/user', require('./userr'));
router.use('/auth', require('./auth'));

module.exports=router;