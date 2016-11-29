const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')

const mongoose = require('mongoose')

//@@@@@@@@@@@ might not need



const router = require('./router')



const app = express()

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth')


// App Setup
app.use(bodyParser.json({ type: '*/*' }))
router(app)


// Server Setup
const port = process.env.PORT || 3090
app.listen(port)
console.log('Server listening on:', port)

