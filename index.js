require('dotenv').config()

// Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')

// Import routers
const authRouter = require('./routes/auth.route')
const accountRouter = require('./routes/account.route')

// Import middlewares
const authMiddleware = require('./middlewares/auth.middleware')

// Session config
app.use(cookieParser(process.env.SECRET))
app.use(cookieSession({
    name: 'session',
    secret: process.env.SECRET,
    maxAge: 3 * 60 * 60 * 1000 // 3 hours
}))

// Config mongoose to connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser: true, useUnifiedTopology: true})
        .then(data => console.log(`Connect database successful!`))
        .catch(err => console.log(`Cannot connect database!`));

// Config static files & view engine
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Config general
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', authRouter)
app.use('/accounts', authMiddleware.requireAuth, accountRouter)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
