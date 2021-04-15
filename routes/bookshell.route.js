const express = require('express')
const router = express.Router()

const controller = require('../controller/bookshell.controller')

router.post('/post', controller.postBookshell)

router.get('/booknew', controller.getBookshell)

module.exports = router