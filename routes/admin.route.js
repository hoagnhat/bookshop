const express = require('express')
const router = express.Router()

const controller = require('../controller/admin.controller')

router.post('/create-book', controller.postBook)

router.get('/create-book', controller.addBook)

router.get('/book-manager', controller.showBook)

router.post('/book-manager', controller.updatePriceBook)

module.exports = router