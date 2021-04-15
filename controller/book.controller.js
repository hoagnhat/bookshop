const Book = require("../models/book.model")
const BookShell = require("../models/bookshell.model")

//hiển thị sách trên trang chủ
module.exports.getBooks = async (req, res) => {
    if (req.query.bookName == undefined) {
        const books = await Book.find( {})
        console.log('URL undefiend')
        render(res, books)
    } else {
        console.log('URL lay duoc tham sao')

        const books = await Book.find( { bookName :  req.query.bookName })
        console.log(books)
        render(res, books)
    }
}

const render = function (res, books) {
    if (books != null) {
        res.render('layouts/books', {books})
    }
}

// Hiển thị trang đăng bán sách của người dùng
module.exports.getAdd = async (req, res) => {
    res.render('layouts/bookshell')
}

//Thêm sách từ booksell vào danh sách book
module.exports.addBookToStore = async (req, res) => {

    const bookExist = await Book.find({ bookName : req.body.bookName})

    if (bookExist.length === 0) { //Chưa có trong book
        const book = new Book();
        book.bookName = req.body.bookName
        book.count = req.body.count
        book.price = req.body.price
        await book.save();
    } else { //đã có trong book rồi
        const bookseller = await BookShell.findOne({bookName : req.body.bookName})
        const book = await Book.findOne({bookName : req.body.bookName})
        book.count += parseInt(bookseller.count)
        await Book.updateOne({bookName : req.body.bookName}, book)
        await BookShell.deleteOne({ bookName : req.body.bookName})
    }


    //TODO Dummy url request
    res.redirect('/book')
}