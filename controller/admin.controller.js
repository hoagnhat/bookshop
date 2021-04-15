const Book = require("../models/book.model")

// Admin thêm sách
module.exports.postBook = async (req, res) => {
    console.log(req.body.bookName)
    const bookExist = await Book.find({bookName : req.body.bookName})
    console.log(bookExist)
    if (bookExist.length === 0) {
        console.log('Vo cho nay duoc chua')
        const book = new Book()
        book.bookName = req.body.bookName
        book.price = req.body.price
        book.image = req.body.image
        book.count = req.body.count
        await book.save()
    }

    //TODO Also redirect dummy here
    res.redirect('/book')
}

// Hiển thị trang thêm sách
module.exports.addBook =  async (req, res) => {
    res.render('layouts/bookcreate')
}

// Hiển thị sách trên trang admin
module.exports.showBook = async(req, res) => {
    const books = await Book.find({});
    res.render('layouts/bookadmin', {books})
}

//Cập nhật giá sách
module.exports.updatePriceBook = async(req, res) => {
    const book = await Book.findOne({bookName : req.body.bookName})
    book.price =  parseInt(req.body.price)
    await Book.updateOne({bookName : req.body.bookName}, book)
    res.redirect('/book-manager')
}