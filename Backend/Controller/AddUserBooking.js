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
const {sendBookingApprovalEmail} = require('../Utils/EmailService')
const senderemail = "jangiddummy6375@gmail.com";
const mailkey = "evhb rvjo ysqi ooss";


exports.foruserbookings = async (req, res) => {
    
        // console.log(req.body);
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
            userEmail,
            couponName,
            isChecking
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

        //   const emailsent = await sendBookingApprovalEmail({
        //     userId : req.user._id,
        //     roomId,
        //     checkInDate,
        //     checkOutDate,
        //     numberOfGuests,
        //     numberOfRooms,
        //     anyChild,
        //     totalAmount,
        //     userName,
        //     userPhone,
        //     senderemail,
        //     mailkey
        // })

        // if(!emailsent){
        //     return res.status(400).json({message: "Failed to send Message of booking"})
        // }
      
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
            userEmail,
            couponName,
            isChecking
            
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
    
        // console.log(`>>>>getallstate>>>>`,allRooms)
    
        if(!allRooms){
            return res.status(400).json({message : "error to fetching state data"})
        }else{
           return res.status(200).json({message: "all booking data fetched", data : allRooms})
        }
}


exports.ShowBookingsWithoutPopulate = async (req,res) =>{
    
    const allRooms = await adduserbooking.find()

    // console.log(`>>>>getallstate>>>>`,allRooms)
    
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
        
        if (!["pending", "approved", "cancelled"].includes(status)) {
          return res.status(400).json({ success: false, message: "Invalid status value" });
        }
    
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

exports.harddelete = async(req, res) => {
    
    const {id} = req.params

    const bookingdelete = await adduserbooking.findByIdAndDelete(id)

    if(!bookingdelete){
        return res.status(400).json({message: "User id has been not found"})
    }

    res.status(200).json({messaage : "User id has been deleted"})
}

exports.softdelete = async(req,res) =>{

    const {id} = req.params

    const softdelete = await adduserbooking.findByIdAndUpdate(
        id,
        {isActive: "false"},
        {new: true}
    )

    // console.log(`>>>>softdelet>>>`,softdelete)

    if(!softdelete){
        return res.status(400).json({message: "Found some error "})
    }

    res.status(200).json({message: "Soft Delete done successfully"})
}




exports.approveUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      
      const booking = await adduserbooking.findById(id);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      
      if (booking.status === "approved") {
        return res.status(400).json({ message: "Booking is already approved" });
      }
  
   
      booking.status = "approved";
      await booking.save();
  
      
      const emailsent = await sendBookingApprovalEmail({
        userId: req.user._id,
        roomId: booking.roomId,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        numberOfGuests: booking.numberOfGuests,
        numberOfRooms: booking.numberOfRooms,
        anyChild: booking.anyChild,
        totalAmount: booking.totalAmount,
        userName: booking.userName,
        userPhone: booking.userPhone,
        userEmail: booking.userEmail,
        anyCoupon: booking.anyCoupon,
        isChecking: booking.isChecking,
        senderemail,
        mailkey
      });

      console.log(`>>>>emailsent>>>`, emailsent)
      console.log("User Email:", booking.userEmail);

  
      if (!emailsent) {
        return res.status(400).json({ message: "Failed to send approval email" });
      }
  
      return res.status(200).json({ message: "Booking approved and email sent" });
  
    } catch (error) {
      console.error("Error in approveUser:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };


  exports.ischecking = async(req,res) => {

    const {id} = req.params

    const ischeckingdata = await adduserbooking.findByIdAndUpdate(
        id,
        {ischecking: 'checkIn'},
        {new: true}
    )

    if(!ischeckingdata){
        return res.status(400).json({message: "Not able to update Checkin request"})
    }

    return res.status(200).json({message: "You are CheckIn !!"})

  }

  exports.ischeckout = async(req, res) =>{

    const {id} = req.params

    const ischeckingout = await adduserbooking.findByIdAndUpdate(
        id,
        {ischecking: 'checkOut'},
        {new: true}
    )

    if(!ischeckingout){
        return res.status(400).json({message: "Not able to update ChecOut request"})
    }

    return res.status(200).json({message: "You are CheckOut !!"})

  }


  
exports.CheckInStatus =  async (req, res) => {
    const { ischecking } = req.query;
    try {
      const data = await adduserbooking.find({ ischecking }); // or .where('ischecking').equals(ischecking)
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


exports.handleCancel = async (req, res) => {
    try {
      const { id } = req.params;  
  
      const data = await adduserbooking.findByIdAndUpdate(
        id,
        { ischecking: "cancel" },
        { new: true }
      );
  
      if (!data) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json({
        message: "Booking cancelled successfully",
        updatedBooking: data
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message
      });
    }
  };
  
  

  exports.showUserbookingdata = async (req, res) => {
    try {
      const userId = req.user._id; // ✅ logged-in user
  
      const userBookings = await adduserbooking.find({ userId }) // filter here
        .populate({
          path: "roomId",
          populate: {
            path: "hotel",
            populate: {
              path: "city",
              populate: {
                path: "state",
              },
            },
          },
        });
  
      if (!userBookings || userBookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this user" });
      }
  
      return res.status(200).json({ message: "User booking data fetched", data: userBookings });
    } catch (err) {
      console.error("Error fetching user bookings:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  


//   exports.showUserbookingdata = async (req,res) => {

//     const allRooms = await adduserbooking.find()
//     .populate({
//       path: 'roomId',
//       populate: {
//           path: "hotel",
//           populate: {
//               path: "city",
//               populate: {
//                   path: "state"
//               }
//           }
//       }   
//     })
  
//       // console.log(`>>>>getallstate>>>>`,allRooms)
  
//       if(!allRooms){
//           return res.status(400).json({message : "error to fetching state data"})
//       }else{
//          return res.status(200).json({message: "all booking data fetched", data : allRooms})
//       }
// }
  
  