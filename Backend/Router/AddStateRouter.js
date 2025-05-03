const express = require('express')
const router = express.Router()
const addstate = require('../Controller/AddStateController')
const auth = require("../Middleware/Auth")

router.post('/addstate',auth, addstate.addingstate)

router.get('/showallstate',auth, addstate.showAllState)

router.put('/updatestate/:id', auth, addstate.updateState)

router.patch('/softdelete/:id', auth, addstate.softDeleteState)

router.delete('/harddelete/:id', auth, addstate.hardDeleteState)

router.patch('/activateentry/:id', auth, addstate.activateState)


module.exports = router