const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4545
const cors = require('cors')

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

app.use('/user', userrouter)
app.use('/admin', adminrouter)
app.use('/addingstate', staterouter)
app.use('/hotelroute', hotelrouter)
app.use('/roomroute', roomroute)

app.listen(port, () => {
    console.log(`${port} is listning`)
})