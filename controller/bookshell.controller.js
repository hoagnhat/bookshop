const Bookshell = require("../models/bookshell.model")
const Book = require("../models/book.model")

// lấy sách cần thua mua
module.exports.getBookshell = async (req, res) => {
    // const book = await Book.findById(req.query.id)
    const books = await Book.find({});
    res.render('layouts/book-shell', {books})
}

// gửi đơn yêu cầu admin mua
module.exports.postBookshell = async (req, res) => {
    const book = await Book.findById(req.body.bookId);
    const bookshell = new Bookshell();
    bookshell.bookId = req.body.bookId;
    bookshell.bookName = book.bookName;
    bookshell.count = req.body.count;
    bookshell.status = false;
    await bookshell.save();

    //TODO Dummy render to test
    res.redirect('/books')
}

//load vào trang sách phê duyệt để tăng số lượng trong db
module.exports.getIncreaseBookBD = async (req, res) => {
    const bookshell = await Bookshell.find({ status : false})
    // console.log(bookshell)
    res.render('layouts/book-update-from-bookshell', {bookshell})
}

//cập nhật sách trong db
module.exports.postIncreaseBookBD = async (req, res) => {
    // console.log('bookId ' + req.body.bookId)
    // console.log('id don hang ' + req.body.id)
    // console.log('count ' + req.body.count)
    const book = await Book.findById(req.body.bookId)
    book.count += parseInt(req.body.count)
    await Book.updateOne({_id : req.body.bookId}, book)


    const bookshell = await Bookshell.findById(req.body.id)
    bookshell.status = true;
    await Bookshell.updateOne({_id : req.body.id}, bookshell)


    //TODO redirect dummy here
    res.redirect('/books')
}