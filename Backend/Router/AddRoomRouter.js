const express = require('express')
const router = express.Router()
const roomroute = require('../Controller/AddRoomController')
const auth = require("../Middleware/Auth")

router.post('/addroom', auth, roomroute.addRoom);

router.get('/getallrooms', auth, roomroute.getAllRooms);

router.put('/updateroom/:id', auth, roomroute.updateRoom);

router.patch('/softdeleteroom/:id', auth, roomroute.softDeleteRoom);

router.delete('/harddeleteroom/:id', auth, roomroute.hardDeleteRoom);

router.patch('/activateroom/:id', auth, roomroute.activateRoom);

router.get('/getroom/:id', auth, roomroute.getRoomById);


module.exports = router 