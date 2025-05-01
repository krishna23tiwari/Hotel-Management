const mongoose = require('mongoose')

const schema = mongoose.Schema

const addCity = new schema({
    city:{
        type: String
    },

    date: {
        type: String
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddState'
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('AddCity',addCity )