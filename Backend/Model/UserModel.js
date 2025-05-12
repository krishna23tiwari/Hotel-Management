const mongoose = require('mongoose')

const schema = mongoose.Schema

const userschema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: false
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
      },
    gender:{
        type: String
    },
    image: {
        type : String,
    },
    age:{
        type:Number
    },
    otp:{
        type: String
    },
    timer:{
        type:Date
    },

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('UserDataEntries', userschema)