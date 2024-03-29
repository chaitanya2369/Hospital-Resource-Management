const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/user_controller.js');
console.log("Users router loaded!!");

router.get('/sign-in',userController.signIn)
router.get('/sign-up',userController.signUp)
router.get('/sign-out',userController.destroySession);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/create-hospitalsdata',userController.renderHospitalspage);


router.post('/create-session',passport.authenticate('local',{failureRedirect: '/users/sign-in'}),userController.createSession);

router.post('/create-user',userController.create);

router.post('/create-hospitals',userController.createHospital);

module.exports = router;