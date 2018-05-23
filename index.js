const express = require('express')
const router = require('./server/router')
const bodyParse = require('body-parser')
const history = require('connect-history-api-fallback')
// const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var app = express()

const staticFileMiddleware = express.static(__dirname + '/build')

app.use(staticFileMiddleware)
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'blog',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	},
	store: new MongoStore({
		url: 'mongodb://localhost:27017/blog'
	})
}))

// app.use(cors({
// 	origin:'http://127.0.0.1:80',
// 	credentials: true
// }));

var middleware = history({
	disableDotRule: true,
	rewrites: [
    {
      from: /(\.js)$/,
      to: function(context) {
      	var pathName = context.parsedUrl.pathname
      	var index = pathName.indexOf('bundle')
        return '/' + pathName.slice(index)
      }
    }
  ]
});

app.use(middleware)

app.use(staticFileMiddleware)
app.use(router)

app.listen(80)