const Order = require('../models/order.model')
const Bookshell = require("../models/bookshell.model")
const Book = require("../models/book.model")

module.exports.getOrderHistory = async (req, res) => {
    //TODO Dummy id user to get history orther
    const userID = '6076b1e6acc4191ea638dcf5'
    const orders = await Order.find({userID : userID})
    res.render('layouts/user-history-buy', {orders})
}

module.exports.getSoldHistory = async (req, res) => {
    //TODO Dummy id user to get history orther
    const userID = '6078341bb36a282660cb09b8'
    const booksold = await Bookshell.find({userID : userID})
    res.render('layouts/user-history-buy', {booksold})
}

module.exports.getOrderHistoryDetails = async (req, res) => {
    if (req.query.id == undefined) {
        res.redirect('/history-buy')
    } else {
        const order = await Order.findById(req.query.id)
        const result = []
        const books =  order.bookID;

        if (books.length==0) {
            res.redirect('/history-buy')
        } else {
            for (let i = 0; i < books.length; i++) {

                const book = await Book.findById(books[i])
                result.push( { name : book.bookName, count : order.count[i], price : book.price} )
            }

        }


        console.log({ array : result, status: order.status })

        res.render('layouts/user-history-buy-detail', { data : { array : result, status: order.status } })
    }
}

module.exports.getSoldHistoryDetails = async (req, res) => {
    if (req.query.id == undefined) {
        res.redirect('/history-sold')
    } else {
        const booksold = await Bookshell.findById(req.query.id)
        res.render('layouts/user-history-sold-detail', {booksold})
    }
}