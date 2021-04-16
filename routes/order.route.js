const express = require('express')
const router = express.Router()

const controller = require('../controller/order.controller')

// GET requests
router.get('/add/:id', controller.insertIntoBasket)
router.get('/cart', controller.showBasket)
router.get('/remove/:id', controller.removeItem)
router.get('/delete/:id', controller.deleteItem)
router.get('/cancel', controller.cancelOrder)
router.get('/pay', controller.payOrder)

// GET requests ( just for admin )
// TODO: Need to authorization
router.get('/order-manage', controller.showOrderManage)
router.get('/accept-order/:id', controller.acceptOrder)
router.get('/reject-order/:id', controller.rejectOrder)

module.exports = router