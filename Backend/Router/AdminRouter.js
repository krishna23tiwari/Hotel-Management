const express = require('express')
const router = express.Router()
const admin = require('../Controller/AdminController')
const auth = require("../Middleware/Auth")

router.post('/AddCityState', auth, admin.AddCityStateInForm )

router.get('/getalldata', auth, admin.GetAllCityState )

router.put('/updatecitystate/:id', auth, admin.UpdateCityState )

router.patch('/softdelete/:id', admin.softdelete )

router.delete('/harddelete/:id',auth, admin.hardDelete)

router.patch('/activateentry/:id', auth, admin.ActivateEntryFromDeactivation)

router.get('/getallstates', auth, admin.getAllStatesFromStates)




module.exports = router 