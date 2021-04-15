const Bookshell = require("../models/bookshell.model")
const Book = require("../models/book.model")

module.exports.postBookshell = async (req, res) => {
    const bookExist = await Bookshell.find({bookName : req.body.bookName})
    // Trường hợp bookshell chưa tồn tại
    if (bookExist.length === 0) {
        const bookseller = new Bookshell()
        bookseller.bookName = req.body.bookName
        bookseller.count = req.body.count
        await bookseller.save()
    } else { // Trường hợp bookshell tồn tại
        const book = await Bookshell.findOne({bookName : req.body.bookName})
        book.count += parseInt(req.body.count)
        await Bookshell.updateOne({bookName : req.body.bookName}, book)
    }
    res.redirect('/book')
}

module.exports.getBookshell = async (req, res) => {
    const bookseller = await Bookshell.find({});
    if (bookseller != null) {
        res.render('layouts/booknew', {bookseller})
    }
}
