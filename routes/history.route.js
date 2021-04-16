const express = require('express')
const router = express.Router()

const controller = require('../controller/history.controller')

router.get('/history-buy', controller.getOrderHistory)

router.get('/history-buy-detail', controller.getOrderHistoryDetails)

router.get('/history-sold', controller.getSoldHistory)

router.get('/history-sold-detail', controller.getSoldHistoryDetails)

module.exports = router