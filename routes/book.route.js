const express = require('express')
const router = express.Router()

const controller = require('../controller/book.controller')

router.get('/book', controller.getBooks)

router.get('/post', controller.getAdd)

router.post('/booknewcreate', controller.addBookToStore)

module.exports = router