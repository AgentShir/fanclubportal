const express = require('express')
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express()
const bodyParser = require('body-parser')

const protectedRoutes = require("./routes/protected")

const publicRoutes = require("./routes/public")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(path.join(__dirname, 'static')))
app.use('/', publicRoutes)
app.use('/api', Authenticate, protectedRoutes)


app.get("/signup", function(req, res, next){
  res.render("signup")
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
