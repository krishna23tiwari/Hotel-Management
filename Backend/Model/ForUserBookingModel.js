const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDataEntries",
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addroom",
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    numberOfRooms:{
        type: Number,
        min: 1
    },
    anyChild:{
        type: Boolean,
        enum: ['true', 'false'], 
        default: 'false' 
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhone: {
      type: Number,
      required: true,
    },
    userEmail:{
        type: String,
        required : true
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'cancel', 'approved'],
        default : "pending"
    },
    ischecking : {
        type: String,
       enum: ['checkIn', 'checkOut', 'cancel', 'waiting'],
        default: "waiting"

    },
    couponName:{
        type: String
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("userbookings", bookingSchema);