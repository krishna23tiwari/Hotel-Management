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

    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('AddHotel',addHotel )




// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const hotelSchema = new Schema({
//   cityId: {
//     type: Schema.Types.ObjectId,
//     ref: 'AddCity'
//   },
//   name: {
//     type: String,
//     require: true,
//   },
//   address: {
//     type: String,
//     require: false,
//   },
//   room: {
//     type: Number,
//     require: true,
//   },
//   description: {
//     type: String,
//     require: false,
//   },
//   contactNo: {
//     type: Number,
//     require: false,
  
//   email: {
//     type: String,
//     require: true,
//   },
//    status: { 
//     type: String, 
//     enum: ['active', 'inactive'], 
//     default: 'active' 
//        },

// }, { timestamps: true, versionKey: false })

// module.exports = mongoose.model('hotel', hotelSchema)