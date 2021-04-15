const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookshellSchema = new Schema({
    bookName: {
        type : String,
        required : true
    },
    count : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Bookshell', bookshellSchema, 'bookshell')