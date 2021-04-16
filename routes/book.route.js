const express = require('express')
const router = express.Router()

const controller = require('../controller/book.controller')

//Post tạo sách của admin
router.post('/create-book', controller.postNewBook)

//Get trang tạo sách mới của admin
router.get('/create-book', controller.getNewBook)

// //Get book từ db ra
// router.get('/books', controller.getBooks)

// GET requests
router.get('/books', controller.findAll)

module.exports = router