const conn = require('../lib/db');

function updateFanPortal(uFanPortalInfo, done){
    const sql = `UPDATE portals
    SET teamName = ?, fanClubName = ?, teamLocation = ?, fanClubLocation= ?, logo = ?, description = ?
    WHERE id = ? and userid = ?`
}


    conn.query(sql, [uFanPortalInfo.userId,uFanPortalInfo.teamName, uFanPortalInfo.fanClubName, uFanPortalInfo.teamLocation, uFanPortalInfo.fanClubLocation, uFanPortalInfo.logo,  uFanPortalInfo.description], function (error, results, fields) {
        if (error) {
          let response = {
            status: "fail",
            message: "A fan club name already exists."
          }
          done(false, response)
        } else if (!error) {
          let response = {
            status:"success",
            message:"The fan portal has been updated"
          }
          done(true, response)
        }
      })
}

module.exports = {
    updateFanPortal
}
