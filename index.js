const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// Routes
const router = require('./router')

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth')


// App Setup
const app = express()
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)


// Server Setup
const port = process.env.PORT || 3090
app.listen(port)
console.log('Server listening on:', port)

