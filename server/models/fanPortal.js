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

  let info = {
    portalInfo:{},
    events:[]
  }
  conn.query(sql,[portalId], function(error, results,fields){
    if(error){
      console.log(' err ', error)
      let response = {
        status: "fail",
        message: "Unable to retrieve fan portal."
      }
      done(false, response)
    }else if(!error){
     info.portalInfo = results[0]
     //Attach all active events to portal Info
     const sql = `SELECT *, DATE_FORMAT(date, "%M %d %Y") as date, DATE_FORMAT(time,  '%h:%i %p') as time FROM events WHERE portalId = ? and active = 1 ORDER BY date, time`
     conn.query(sql,[portalId],function(error,results,fields){
       if(error){
         let response = {
           status:"fail",
           message:"Unable to retrieve fan portal events."
         }
         done(false,response)
       }else if(!error){
          info.events = results
          done(true,info)
       }
     })
    }
  })
}
function updatePortal(portalId, portalInfo, done){
    const sql = `UPDATE portals
    SET teamName = ?, fanClubName = ?, teamLocation = ?, fanClubLocation= ?, logo = ?, description = ?
    WHERE id = ? and userid = ?`

    conn.query(sql, [portalInfo.teamName, portalInfo.fanClubName, portalInfo.teamLocation, portalInfo.fanClubLocation, portalInfo.logo,  portalInfo.description, portalId, portalInfo.userId], function (error, results, fields) {
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
  addFanPortal,
  getPortalInfo,
  updatePortal
}
