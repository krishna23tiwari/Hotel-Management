const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4545
const cors = require('cors')
const fileupload = require('express-fileupload')
const schedule = require('./CronScheduling/FindUserNotCheckIn')
const cron = require('node-cron')

app.use(fileupload())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const mongourl = "mongodb://localhost:27017/Hotel"

mongoose.connect(mongourl)
.then(() => console.log("connected"))
.catch(() => console.log("not connected"))

const userrouter = require('./Router/UserRouter')
const adminrouter = require('./Router/AddCityRouter')
const staterouter = require('./Router/AddStateRouter')
const hotelrouter = require('./Router/AddHotelRouter')
const roomroute = require('./Router/AddRoomRouter')
const bookingroute = require('./Router/UserBookings')
const couponroute = require('./Router/CouponRoute')

app.use('/user', userrouter)
app.use('/admin', adminrouter)
app.use('/addingstate', staterouter)
app.use('/hotelroute', hotelrouter)
app.use('/roomroute', roomroute)
app.use('/userbooking', bookingroute)
app.use('/coupon', couponroute )

app.listen(port, () => {
    console.log(`${port} is listning`)
})