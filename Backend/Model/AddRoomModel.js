const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room: { type: String, required: true },
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['Standard', 'Deluxe', 'Suite', 'Premium', 'Executive']
  },
  capacity: {
    type: Number,
    required: [true, 'Room capacity is required'],
    min: 1,
    max: 10
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: 0
  },
  amenities: [{
    type: String
  }],
  description: {
    type: String,
    trim: true
  },
  image: [ String ],
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "AddHotel", required: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
},
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("addroom", roomSchema);



