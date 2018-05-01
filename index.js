const express = require('express')
const router = require('./server/router')
const bodyParse = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'blog',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog'
  })
}))

app.use(cors({
  origin:['http://127.0.0.1:8080'],
  methods:['GET','POST'],
  credentials: true
}));


app.use(router)

app.listen(3000)