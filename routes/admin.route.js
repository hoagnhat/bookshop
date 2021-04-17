const express = require('express')
const router = express.Router()

const controller = require('../controller/admin.controller')

router.get('/admin', controller.loadAdminPage)

module.exports = router