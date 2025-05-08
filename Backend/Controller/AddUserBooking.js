const addstatemodel = require('../Model/AddStateModel')
const addcitymodel = require('../Model/AddCityModel')
const addhotel = require('../Model/AddHotelModel')
const addroom = require('../Model/AddRoomModel')
const adduserbooking = require('../Model/ForUserBookingModel')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { populate } = require('../Model/UserModel')
// const { findByIdAndUpdate } = require('../Model/UserModel');
const secret = "asasfasfijqwijjqwmnasfa"


exports.foruserbookings = async (req, res) => {
    
        console.log(req.body);
        try {
          const {
            roomId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            numberOfRooms,
            anyChild,
            totalAmount,
            userName,
            userPhone,
          } = req.body;
      
          const conflict = await adduserbooking.findOne({
            roomId,
            status: "booked",
            $or: [
              {
                checkInDate: { $lt: new Date(checkOutDate) },
                checkOutDate: { $gt: new Date(checkInDate) },
              },
            ],
          });
      
          if (conflict) {
            return res.status(200).json({ message: "Room is already booked" });
          }
      
          const booking = new adduserbooking({
            userId : req.user._id,
            roomId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            numberOfRooms,
            anyChild,
            totalAmount,
            userName,
            userPhone,
            
          });
      
          const save = await booking.save();
          res.status(201).json({ message: "Room Booked Successfully", save });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      

exports.showbookingdata = async (req,res) => {

      const allRooms = await adduserbooking.find()
      .populate({
        path: 'roomId',
        populate: {
            path: "hotel",
            populate: {
                path: "city",
                populate: {
                    path: "state"
                }
            }
        }   
      })
    
        console.log(`>>>>getallstate>>>>`,allRooms)
    
        if(!allRooms){
            return res.status(400).json({message : "error to fetching state data"})
        }else{
           return res.status(200).json({message: "all booking data fetched", data : allRooms})
        }
}


exports.ShowBookingsWithoutPopulate = async (req,res) =>{
    
    const allRooms = await adduserbooking.find()

    console.log(`>>>>getallstate>>>>`,allRooms)
    
    if(!allRooms){
        return res.status(400).json({message : "error to fetching state data"})
    }else{
       return res.status(200).json({message: "all booking data fetched", data : allRooms})
    }


}


exports.UpdateUserBookingStatus = async (req,res) => {

    const {id} = req.params
    const {status} = req.body

    try {
        // Validate the status value
        if (!["pending", "approved", "cancelled"].includes(status)) {
          return res.status(400).json({ success: false, message: "Invalid status value" });
        }
    
        // Find and update the booking
        const updatedBooking = await adduserbooking.findByIdAndUpdate(
          id,
          { status: status },
          { new: true }
        );
    
        if (!updatedBooking) {
          return res.status(404).json({ success: false, message: "Booking not found" });
        }
    
        return res.status(200).json({ success: true, message: "Status updated", data: updatedBooking });
      } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ success: false, message: "Server error" });
      }


}

 