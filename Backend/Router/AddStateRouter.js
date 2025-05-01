const express = require('express')
const router = express.Router()
const addstate = require('../Controller/AddStateController')
const auth = require("../Middleware/Auth")

router.post('/addstate',auth, addstate.addingstate)

router.get('/showallstate',auth, addstate.showAllState)

module.exports = router