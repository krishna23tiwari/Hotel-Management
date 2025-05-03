const express = require('express')
const router = express.Router()
const hotelroute = require('../Controller/AddHotelController')
const auth = require("../Middleware/Auth")

router.post('/addhotel', auth, hotelroute.addHotel);


router.get('/getallhotels', auth, hotelroute.getAllHotels);


router.put('/updatehotel/:id', auth, hotelroute.updateHotel);

router.patch('/softdeletehotel/:id', auth, hotelroute.softDeleteHotel);


router.delete('/harddeletehotel/:id', auth, hotelroute.hardDeleteHotel);


router.patch('/activatehotel/:id', auth, hotelroute.activateHotel);

router.get('/showallstateprint', auth, hotelroute.getAllStateprint);



module.exports = router 