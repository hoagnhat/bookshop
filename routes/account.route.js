const express = require('express')
const router = express.Router()

const controller = require('../controller/account.controller')

// GET requests
router.get('/', controller.findAll)

module.exports = router