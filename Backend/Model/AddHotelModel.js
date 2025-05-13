const mongoose = require('mongoose')

const schema = mongoose.Schema

const addHotel = new schema({
    hotel:{
        type: String
    },
    date: {
        type: String
    },
     city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AddCity'
        },
    
        address: {
    type: String,
    require: true,
  },
  room: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('AddHotel',addHotel )
