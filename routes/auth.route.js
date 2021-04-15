const express = require('express')
const router = express.Router()

const controller = require('../controller/auth.controller')

// GET Requests
router.get('/login', controller.GetLogin)
router.get('/register', controller.GetRegister)
router.get('/logout', controller.GetLogout)

// POST Requests
router.post('/login', controller.PostLogin)
router.post('/register', controller.PostRegister)

module.exports = router