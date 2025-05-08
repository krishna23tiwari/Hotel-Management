const express = require('express')
const router = express.Router()
const auth = require('../Middleware/Auth')
const couponrouter = require('../Controller/CouponController')

router.post('/addcoupon', auth, couponrouter.addcoupon)

router.get('/getallcoupon', auth, couponrouter.getallcoupon)

router.delete('/harddelete/:id', auth, couponrouter.harddelete)

router.patch('/softdelete/:id', auth, couponrouter.softdelete)

router.patch('/activatecoupon/:id', auth, couponrouter.activatecoupon)

router.put('/updatecoupon/:id', auth, couponrouter.updatecoupon)


module.exports = router