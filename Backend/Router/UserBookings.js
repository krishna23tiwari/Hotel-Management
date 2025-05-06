const express = require('express')
const router = express.Router()
const addUserBooking = require('../Controller/AddUserBooking')
const auth = require("../Middleware/Auth")


router.post('/forbooking', auth, addUserBooking.foruserbookings)

router.get('/showallbooking', auth, addUserBooking.showbookingdata)

module.exports = router 