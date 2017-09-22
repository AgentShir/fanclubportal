var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const conn = require('../lib/db');
const bcrypt = require('bcrypt');
const config = require('config');
const user = require('../models/user');



/* /api starting endpoint */
router.get('/foo', function (req, res, next) {
  res.json({
    foo: 'bar'
  })
});


router.post('/register', function(req, res, next) {
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  console.log('in route api register', req.body)
  if (fname.length === 0 || lname.length === 0 || username.length === 0 || password.length == 0 || email.length === 0) {
    let response = {
        status: "fail",
        message: "All fields must be completed"
    }
    res.status(401).json(response)
}

  user.registerUser(req.body, function(success, response){
    if (!success) {
      console.log('something went wrong', response)
      res.status(401).json(response)
    } else {
      res.json(response)
    }
  })

})

router.post("/token", function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  const sql = `
    SELECT password FROM users
   WHERE username = ?
  `

  conn.query(sql, [username], function (err, results, fields) {

    if (err || results.length === 0) {
      res.status(401).json({
        message: 'Invalid Credentials'
      })
    } else {
      const hashedPassword = results[0].password.toString()
      bcrypt.compare(password, hashedPassword).then(function (result) {
        if (result) {
          // notice we don't need to store tokens in the database!
          res.json({
            token: jwt.sign({ username }, config.get('secret'), { expiresIn: config.get('sessionLengthInSeconds') }),
            username: username
          })
        } else {
          res.status(401).json({
            message: 'Invalid Credentials'
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  })
})

module.exports = router;
