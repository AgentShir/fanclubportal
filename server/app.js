var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var userApiRoutes = require('./routes/userApi')
var portalApiRoutes = require('./routes/portalApi')
var eventApiRoutes = require('./routes/eventApi')
var webRoutes = require('./routes/web')

var app = express()

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', userApiRoutes)
app.use('/api/portal', portalApiRoutes)
app.use('/api/event', eventApiRoutes)
app.use('/', webRoutes)

// no stacktraces leaked to user in production
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  })
})

module.exports = app
