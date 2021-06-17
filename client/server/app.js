require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/cors.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)

// cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:"dvdwwxoju",
    api_key: "666432229823685",
    api_secret: "qC0yoznAKY_wLJ_4n5yZ99IboME"
})


// Routes index
require('./routes')(app)
app.listen(5000)

module.exports = app