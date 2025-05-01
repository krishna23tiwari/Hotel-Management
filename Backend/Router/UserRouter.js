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



module.exports = router 

