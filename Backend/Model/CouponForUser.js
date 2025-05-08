const mongoose = require('mongoose')


const CouponCode = mongoose.Schema({
    couponName:{
        type: String,

    },

    discount: {
        type: Number
    },

    startDate:{
        type: Date
    },

    endDate:{
        type: Date
    },

    isActive:{
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('couponCodes', CouponCode)