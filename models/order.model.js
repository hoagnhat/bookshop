const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    bookID: {
        type: [String]
    },
    count: {
        type: [Number]
    },
    total: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'empty'
    }
})

module.exports = mongoose.model('Order', orderSchema, 'order')