const express = require('express')
const router = require('./server/router')
const bodyParse = require('body-parser')
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(router)

app.listen(3000)