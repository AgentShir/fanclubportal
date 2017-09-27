const conn = require('../lib/db');

function addFanPortal(fanPortalInfo, done) {
  const sql = `INSERT INTO portals (userId, teamName, fanClubName, teamLocation, fanClubLocation, logo, description)
    VALUES (?,?,?,?,?,?,?)`
  const userId = fanPortalInfo.userId

  conn.query(sql, [userId, fanPortalInfo.teamName, fanPortalInfo.fanClubName, fanPortalInfo.teamLocation, fanPortalInfo.fanClubLocation, fanPortalInfo.logo, fanPortalInfo.description], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "A fan club name already exists."
      }
      done(false, response)
    } else if (!error) {
      //Retrieve new portal info to display on portal view
      let sql = `SELECT * FROM portals WHERE userId = ? and active = 1`
      conn.query(sql, [userId], function (err, results, fields) {
        if (err) {
          throw (err)
        }
        else {
          let response = {
            portalId:results[0].id
          }
          return done(true, response)
        }
      })
    }
  })
}

function getPortalInfo(portalId, done){
  const sql = `SELECT id, teamName, fanClubName, teamLocation, fanClubLocation, logo, description, DATE_FORMAT(createDate, "%M %d %Y") as createDate, DATE_FORMAT(lastUpdate, "%M %d %Y") as lastUpdate FROM portals WHERE id = ? and active = 1`
  conn.query(sql,[portalId], function(error, results,fields){
    if(error){
      let response = {
        status: "fail",
        message: "Unable to retrieve fan portal."
      }
      done(false, response)
    }else if(!error){
      done(true, results[0])
    }
  })
}
module.exports = {
  addFanPortal,
  getPortalInfo
}
