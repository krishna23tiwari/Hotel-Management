const addstatemodel = require('../Model/AddStateModel')
const addhotelmodel = require('../Model/AddHotelModel')
const addroommodel = require('../Model/AddRoomModel')
const roommodel = require('../Model/AddRoomModel');
const{uploadFile} = require('../Utils/ImagesUpload')


// exports.addRoom = async (req, res) => {
//     try {

//       let files = req.files && req.files.images
//       if (!files) files = []                    
//       else if (!Array.isArray(files)) files = [files]
  
//       let imageUrls = []
//       if (files.length) {
//         const uploadResults = await uploadFile(files)
//         imageUrls = uploadResults.map(r => r.secure_url)
//       }
  
//       const { room, type, price, hotel, status } = req.body
//       const newRoom = new roommodel({
//         room,
//         type,
//         price,
//         image: imageUrls, 
//         hotel,
//         status
//       })
//       await newRoom.save()
  
//       res.status(200).json({
//         message: "Room successfully added",
//         data: newRoom
//       })
//     } catch (error) {
//       console.error("Error adding room:", error)
//       res.status(500).json({ message: "Failed to add room" })
//     }
//   }


exports.addRoom = async (req, res) => {
    try {
      let files = req.files && req.files.images;
      if (!files) files = [];
      else if (!Array.isArray(files)) files = [files];
  
      let imageUrls = [];
      if (files.length) {
        const uploadResults = await uploadFile(files);
        imageUrls = uploadResults.map(r => r.secure_url);
      }
  
      const {
        room,
        roomNumber,
        type,
        capacity,
        price,
        amenities,
        description,
        hotel,
        status
      } = req.body;
  
      const newRoom = new roommodel({
        room,
        roomNumber,
        type,
        capacity,
        price,
        amenities,
        description,
        image: imageUrls,
        hotel,
        status
      });
  
      await newRoom.save();
  
      res.status(200).json({
        message: "Room successfully added",
        data: newRoom
      });
    } catch (error) {
      console.error("Error adding room:", error);
      res.status(500).json({ message: "Failed to add room" });
    }
  };
  
  

exports.getAllRooms = async (req, res) => {
    try {
        const allRooms = await roommodel.find()
            .populate({
                path: "hotel",
                populate: {
                    path: "city",
                    populate: {
                        path: "state"
                    }
                }
            });

        res.status(200).json({ message: "All rooms fetched", data: allRooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { room, hotel, city, state } = req.body;
  
    try {
     
      const existingRoom = await roommodel.findById(id);
      if (!existingRoom) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      
      let imageUrls = existingRoom.image || [];
  
     
      if (req.files && req.files.image) {
        const images = Array.isArray(req.files.image)
          ? req.files.image
          : [req.files.image];
  
        for (const image of image) {
          const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "rooms",
          });
          imageUrls.push(uploadRes.secure_url); 
        }
      }
  

      const updatedRoom = await roommodel.findByIdAndUpdate(
        id,
        {
          room,
          hotel,
          city,
          state,
          image: imageUrls,
        },
        { new: true }
      );
  
      res.status(200).json({ message: "Room updated successfully", data: updatedRoom });
    } catch (error) {
      console.error("Error updating room:", error);
      res.status(500).json({ message: "Update failed" });
    }
  };


exports.softDeleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await roommodel.findByIdAndUpdate(
            id,
            {status: 'inactive'},
            { new: true }
        );

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room soft deleted", data: room });
    } catch (error) {
        console.error("Error soft deleting room:", error);
        res.status(500).json({ message: "Delete failed" });
    }
};




exports.activateRoom = async (req, res) => {
    const { id } = req.params;
  
    const room = await roommodel.findById(id).populate({
      path: 'hotel',
      populate: {
        path: 'city',
        populate: {
          path: 'state'
        }
      }
    });
  
    if (!room) return res.status(404).json({ message: "Room not found" });
  
    const hotel = room.hotel;
    const city = hotel.city;
    const state = city.state;
  
    if (hotel.status !== 'active') return res.status(400).json({ message: "Hotel is inactive" });
    if (city.status !== 'active') return res.status(400).json({ message: "City is inactive" });
    if (state.status !== 'active') return res.status(400).json({ message: "State is inactive" });
  
    const updatedRoom = await roommodel.findByIdAndUpdate(id, { status: 'active' }, { new: true });
  
    res.status(200).json({ message: "Room activated", data: updatedRoom });
  };
  


exports.hardDeleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoom = await roommodel.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room permanently deleted" });
    } catch (error) {
        console.error("Error hard deleting room:", error);
        res.status(500).json({ message: "Deletion failed" });
    }
};
