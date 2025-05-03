const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  price: { type: Number }, 
  image: { type: String },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "AddHotel", required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
},
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
