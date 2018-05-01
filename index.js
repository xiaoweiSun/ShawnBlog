const express = require('express')
const router = require('./server/router')
const bodyParse = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 2592000000
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog'
  })
}))
app.use(router)

app.listen(3000)