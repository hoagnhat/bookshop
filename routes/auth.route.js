const express = require('express')
const router = express.Router()

const controller = require('../controller/auth.controller')

// GET Requests
router.get('/login', controller.GetLogin)

// POST Requests
router.post('/login', controller.PostLogin)

module.exports = router