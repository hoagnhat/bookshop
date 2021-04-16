require('dotenv').config()

// Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

// Import routers
const authRouter = require('./routes/auth.route')
const bookRouter = require('./routes/book.route')
const bookshellRouter = require('./routes/bookshell.route')

// Environment variables
const PORT = process.env.PORT

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
app.use('/', bookRouter)
app.use('/', bookshellRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
