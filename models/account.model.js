const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        defautl: 'user'
    }
})

module.exports = mongoose.model('Account', accountSchema, 'account')