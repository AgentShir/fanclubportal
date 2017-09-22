// working out the backend side of the registration file

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const conn = require('../lib/db');

router.post('/register', function(req, res, next){
  const username = req.body.username
  const password = req.body.password
  const token = uuid()

  const sql = `
    INSERT INTO gabblers (username, password, token)
    VALUES (?, ?, ?)
  `

  bcrypt.hash(password, 10).then(function(hashedPassword){
    conn.query(sql, [username, hashedPassword, token], function(err, results, fields){
      res.json({
        message: 'In like Flynn',
        token: token
      })
    })
  })
})
