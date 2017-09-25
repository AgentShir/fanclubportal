const conn = require('../lib/db');
const config = require('config')

function fanPortal(fanPortInfo, done){
    const sql = `INSERT INTO portals (teamName, fanClubName, teamLocation, fanClubLocation, description)
    VALUES (?,?,?,?,?)`


console.log("inside model")
    conn.query(sql, [fanPortal.teamName, fanPortal.fanClubName, fanPortal.teamLocation, fanPortal.fanClubLocation, fanPortal.teamLocation, fanPortal.fanClubLocation, fanPortal.description], function (error, results, fields) {
        if (error) {
          let response = {
            status: "fail",
            message: "Unable to create event."
          }
          done(false, response)
        } else if (!error) {
          let response = {
            status:"success",
            message:"New event created."
          }
          done(true, response)
        }
      })
}

module.exports = {
    fanPortal
}
