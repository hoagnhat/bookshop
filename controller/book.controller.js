const Book = require("../models/book.model")
const Order = require('../models/order.model')

//Admin thêm sách mới vào giỏ shop
module.exports.postNewBook = async (req, res) => {
    const book = new Book();
    book.bookName = req.body.bookName
    book.count = req.body.count
    book.price = req.body.price
    book.image = req.body.image
    await book.save()

    //TODO Redirect dummy
    res.redirect('/books')
}

//Load trang thêm sách mới
module.exports.getNewBook = async (req, res) => {
    res.render('layouts/book-form-new')
}

//Load hết sách trong db ra
module.exports.getBooks = async(req, res) => {

    //TODO DUmmy other here to test
    // const day = Date.parse('2021-04-23');
    // const order = new Order();
    // order.userID = 'xyz'
    // order.bookID = ['6078ed6aa78c6f3f1858f0ba','6078d2bb42ce2624f076da08', '6078c3de9a85fe1dc0d4cc92']
    // order.count = [3, 4, 6]
    // order.date = day;
    // await order.save();

    if (req.query.id == undefined) {
        const books = await Book.find( {})
        render(res, books)
    } else {
        const book = await Book.findById(req.query.id)
        const books = []
        books.push(book)
        render(res, books)
    }
}

const render = function (res, books) {
    if (books != null) {
        res.render('layouts/book-from-db', {books})
    }
}

module.exports.findAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const perPage = 8
    const start = (page - 1) * perPage
    const end = page * perPage
    const books = await Book.find()
    const pageNumber = (page / perPage) + 1
    const pages = []
    for (let i = 0; i < pageNumber; i++) {
        pages[i] = i + 1
    }
    res.render('layouts/bookshop', { books: books.slice(start, end), pages: pages })
}