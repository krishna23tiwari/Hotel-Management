const mongoose = require('mongoose')

const schema = mongoose.Schema

const addHotel = new schema({
    hotel:{
        type: String
    },
    date: {
        type: String
    },
     state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AddState'
        },

    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('AddHotel',addState )