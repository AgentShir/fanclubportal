const conn = require('../lib/db');

function addFanPortal(fanPortalInfo, done){
    const sql = `INSERT INTO portals (userId, teamName, fanClubName, teamLocation, fanClubLocation, logo, description)
    VALUES (?,?,?,?,?,?,?)`


    conn.query(sql, [fanPortalInfo.userId,fanPortalInfo.teamName, fanPortalInfo.fanClubName, fanPortalInfo.teamLocation, fanPortalInfo.fanClubLocation, fanPortalInfo.logo,  fanPortalInfo.description], function (error, results, fields) {
        if (error) {
          let response = {
            status: "fail",
            message: "A fan club name already exists."
          }
          done(false, response)
        } else if (!error) {
          let response = {
            status:"success",
            message:"New fan portal created."
          }
          done(true, response)
        }
      })
}

module.exports = {
    addFanPortal
}
