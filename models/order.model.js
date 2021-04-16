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
    date: {
      type: Date
    },
    status: {
        type: String,
        default: 'pending'
    }
})

module.exports = mongoose.model('Order', orderSchema, 'order')