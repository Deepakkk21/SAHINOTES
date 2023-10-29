const authController=require("../controllers/auth_controller");
const express = require('express');
const app = express();
const router = express.Router();

router.get('/signup',authController.signupPage); // this is the route
router.post('/signup',authController.signup); // this is the route
router.get('/signIn',authController.signInPage); // this is the route
router.post('/signIn',authController.signIn); // this is the route

module.exports = router;