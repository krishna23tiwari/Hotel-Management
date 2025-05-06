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



// exports.showbookingdata = async (req, res) => {
//     try {
//       const allBookings = await adduserbooking.find()
//         .populate({
//           path: 'roomId',
//           populate: {
//             path: 'hotel',
//             populate: {
//               path: 'city',
//               populate: {
//                 path: 'state'
//               }
//             }
//           }
//         });
  
//       if (!allBookings || allBookings.length === 0) {
//         return res.status(404).json({ message: "No booking data found" });
//       }
  
//       res.status(200).json({ message: "All booking data fetched", data: allBookings });
//     } catch (error) {
//       console.error("Error in showbookingdata:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  

 