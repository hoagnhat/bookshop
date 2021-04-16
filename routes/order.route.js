const express = require('express')
const router = express.Router()

const controller = require('../controller/order.controller')

// GET requests
router.get('/add', controller.insertIntoBasket)
router.get('/cart', controller.showBasket)

module.exports = router