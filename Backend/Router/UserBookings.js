const express = require('express')
const router = express.Router()
const addUserBooking = require('../Controller/AddUserBooking')
const auth = require("../Middleware/Auth")


router.post('/forbooking', auth, addUserBooking.foruserbookings)

router.get('/showallbooking', auth, addUserBooking.showbookingdata)

router.get('/getbookingdataforadmin', auth, addUserBooking.ShowBookingsWithoutPopulate)

router.put('/updatebookingstatus/:id', auth, addUserBooking.UpdateUserBookingStatus)

router.delete('/harddelete/:id', auth, addUserBooking.harddelete)

router.put('/approveuser/:id', auth, addUserBooking.approveUser)

router.put('/checkin/:id', auth, addUserBooking.ischecking)

router.put('/checkout/:id', auth, addUserBooking.ischeckout)

router.get('/checkstatus', auth, addUserBooking.CheckInStatus)

router.patch('/handlecancel/:id', auth, addUserBooking.handleCancel)

router.get('/showuserbooking', auth, addUserBooking.showUserbookingdata)


module.exports = router 