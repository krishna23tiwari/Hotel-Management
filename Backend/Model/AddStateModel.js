const mongoose = require('mongoose')

const schema = mongoose.Schema

const addState = new schema({
    state:{
        type: String
    },

    code: {
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
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('AddState',addState )