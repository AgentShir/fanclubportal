var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const conn = require('../lib/db');
const bcrypt = require('bcrypt');
const config = require('config');


/* /api starting endpoint */
router.get('/foo', function (req, res, next) {
  res.json({
    foo: 'bar'
  })
});

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
