const express = require('express')
const router = express.Router()

const controller = require('../controller/order.controller')
const authMiddleware = require('../middlewares/auth.middleware')

// GET requests
router.get('/add/:id', controller.insertIntoBasket)
router.get('/cart', controller.showBasket)
router.get('/remove/:id', controller.removeItem)
router.get('/delete/:id', controller.deleteItem)
router.get('/cancel', controller.cancelOrder)
router.get('/pay', controller.payOrder)

// GET requests ( just for admin )
router.get('/order-manage', authMiddleware.isAdmin, controller.showOrderManage)
router.get('/accept-order/:id', authMiddleware.isAdmin, controller.acceptOrder)
router.get('/reject-order/:id', authMiddleware.isAdmin, controller.rejectOrder)

module.exports = router