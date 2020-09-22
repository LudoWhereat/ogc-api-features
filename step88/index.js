const express = require('express')
var route = require('./route')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use('/kontich', route)
app.set('json spaces', 2); // beautify json response

module.exports = app
