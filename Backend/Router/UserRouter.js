const express = require('express')
const router = express.Router()
const user = require('../Controller/UserController')
const auth = require("../Middleware/Auth")

router.post('/signup', user.signup)

router.post('/verifyotp', user.verifyOtp)

router.post('/login', user.login)

router.post('/sendOtpOnLogin', user.sendOtpOnLoginCheck)

router.post('/verifyResetOtp', user.VerifyOtpOnReset)

router.post('/resetPassword', user.resetPassword)

router.put('/reset-password', auth, user.userPasswordReset)

router.patch('/editnamephonegenderage',auth, user.updateUserNamePhoneGenderAge)

router.post('/profile', auth, user.getUserProfile);

router.get('/getalluerinfo', auth, user.getAllUserInfo)

router.get('/getuserinfo', auth, user.getUserInfodata)

router.post('/backgroundimage', auth, user.backgroundImageSet)


module.exports = router 

