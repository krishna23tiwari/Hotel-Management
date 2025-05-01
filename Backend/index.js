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
const adminrouter = require('./Router/AdminRouter')
const staterouter = require('./Router/AddStateRouter')


app.use('/user', userrouter)
app.use('/admin', adminrouter)
app.use('/addingstate', staterouter)

app.listen(port, () => {
    console.log(`${port} is listning`)
})