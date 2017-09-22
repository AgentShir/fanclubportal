const conn = require('../lib/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

function registerUser(regInfo, done) {
  console.log('regInfo model register', regInfo)
  const hash = bcrypt.hashSync(regInfo.password, 10)
  const sql = `INSERT INTO users (fname, lname, username, email, password)
    VALUES (?, ?, ?, ?, ?)`

    conn.query(sql, [regInfo.fname, regInfo.lname, regInfo.username, regInfo.email, hash], function(error, results, fields) {
      if (error) {
        console.log('sql error', error)
        let response = {
          status: "fail",
          message: "Credentials already exists."
        }
        done(false, response)
      } else if (!error) {
        let response = {
          status: "success",
          message: "User successfully registered."
        }
        done(true, response)
      }
    })
}

module.exports = {
  registerUser
}
