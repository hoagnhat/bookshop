const express = require('express')
const router = express.Router()

const controller = require('../controller/bookshell.controller')


// User bán sách cho admin
router.get('/book-sell-by-user', controller.getBookshell)

//thực hiện tạo bookshell
router.post('/book-sell-by-user', controller.postBookshell)

//Load trang Admin chấp nhận
router.get('/book-accept', controller.getIncreaseBookBD)

//Admin chấp nhận, tăng
router.post('/book-accept', controller.postIncreaseBookBD)

module.exports = router