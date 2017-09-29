const conn = require('../lib/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken')
const config = require('config');

function registerUser(regInfo, done) {
  const hash = bcrypt.hashSync(regInfo.password, 10)
  const username = regInfo.username
  const sql = `INSERT INTO users (fname, lname, username, email, password)
    VALUES (?, ?, ?, ?, ?)`

  conn.query(sql, [regInfo.fname, regInfo.lname, regInfo.username, regInfo.email, hash], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Credentials already exists."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status:"success",
        username: username
      }
      done(true, response)
    }
  })
}

function login(username, password, done) {
  const sql = `
  SELECT u.password, u.id as userId, p.id as portalId FROM users u
  LEFT JOIN portals p on p.userId = u.id
 WHERE username = ?
`
  conn.query(sql, [username], function (err, results, fields) {

    if (err || results.length === 0) {
      let response ={ message:'Invalid Credentials'}
      done(false, response)
    } else {
      const hashedPassword = results[0].password.toString()
      const userId = results[0].userId
      const portalId = results[0].portalId

      bcrypt.compare(password, hashedPassword).then(function (result) {
        if (result) {
          // notice we don't need to store tokens in the database!
          let response ={
            token: jwt.sign({ username }, config.get('secret'), { expiresIn: config.get('sessionLengthInSeconds') }),
            username: username,
            userId:userId,
            portalId:portalId
          }
          done(true, response)
        } else {
          let response ={ message:'Invalid Credentials'}
          done(false,response)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  })
}
module.exports = {
  registerUser,
  login
}
