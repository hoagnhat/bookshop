const express = require('express')
const router = express.Router()

const controller = require('../controller/static.controller')

router.get('/statis', controller.getStatis)

module.exports = router