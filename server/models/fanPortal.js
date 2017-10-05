const conn = require('../lib/db');

function addFanPortal(fanPortalInfo, done) {
  const sql = `INSERT INTO portals (userId, categoryId, fanClubName, fanClubLocation, logo, description)
    VALUES (?,?,?,?,?,?)`
  const userId = fanPortalInfo.userId
  conn.query(sql, [userId, fanPortalInfo.categoryId, fanPortalInfo.fanClubName, fanPortalInfo.fanClubLocation, fanPortalInfo.logo, fanPortalInfo.description], function (error, results, fields) {
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
            portalId: results[0].id,
            status: 'success'
          }
          return done(true, response)
        }
      })
    }
  })
}

function getPortalInfo(portalId, done) {
  const sql = `SELECT id, categoryId, fanClubName, fanClubLocation, logo, description, DATE_FORMAT(createDate, "%M %d %Y") as createDate, DATE_FORMAT(lastUpdate, "%M %d %Y") as lastUpdate FROM portals WHERE id = ? and active = 1`

  let info = {
    portalInfo: {},
    events: []
  }
  conn.query(sql, [portalId], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to retrieve fan portal."
      }
      done(false, response)
    } else if (!error) {
      if (results.length > 0) {
        info.portalInfo = results[0]
        //Attach all active events to portal Info
        const sql = `SELECT *, DATE_FORMAT(e.date, "%M %d %Y") as date, DATE_FORMAT(e.time,  '%h:%i %p') as time FROM events e
       WHERE portalId = ? and active = 1 and date >= CURDATE()
       ORDER BY e.date, e.time`
        conn.query(sql, [portalId], function (error, results, fields) {
          if (error) {
            let response = {
              status: "fail",
              message: "Unable to retrieve fan portal events."
            }
            done(false, response)
          } else if (!error) {
            info.events = results
            info.status = 'success'
            done(true, info)
          }
        })
      }else{
        let response = {
          status: "fail",
          message: "No portal found."
        }
        done(false,response)
      }
    }
  })
}

function updatePortal(portalId, portalInfo, done) {
  const sql = `UPDATE portals
    SET categoryId = ?, fanClubName = ?, fanClubLocation= ?, logo = ?, description = ?, lastUpdate = ?
    WHERE id = ? and userid = ?`
  conn.query(sql, [portalInfo.categoryId, portalInfo.fanClubName, portalInfo.fanClubLocation, portalInfo.logo, portalInfo.description, portalInfo.lastUpdate, portalId, portalInfo.userId], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "A fan club name already exists."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status: "success",
        message: "The fan portal has been updated"
      }
      done(true, response)
    }
  })
}

function getPortalCategories(done) {
  const sql = `SELECT * FROM categories WHERE active = 1 ORDER BY category`
  conn.query(sql, function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to retrieve categories."
      }
      done(false, response)
    } else if (!error) {
      let response = results
      done(true, response)
    }
  })
}

function getPortalsByCategory(categoryId, done) {
  const sql = `SELECT p.id, p.fanClubName, p.logo, c.category FROM portals p 
  JOIN categories c on p.categoryId = c.id
  WHERE p.categoryId = ? and p.active = 1`

  conn.query(sql, [categoryId], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to retrieve portals."
      }
      done(false, response)
    } else if (!error) {
      let response = results
      done(true, response)
    }
  })
}
function searchPortals(searchTerm, done) {
  const sql = `SELECT   id, fanClubName, logo FROM portals
  WHERE (fanClubName RLIKE ? OR fanClubLocation RLIKE ? OR description RLIKE ?)
  AND active = 1`

  conn.query(sql, [searchTerm, searchTerm, searchTerm], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Error retrieving search results."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status: "success",
        message: results.length + " results for " + searchTerm,
        searchResults: results
      }
      done(true, response)
    }
  })
}

module.exports = {
  addFanPortal,
  getPortalInfo,
  updatePortal,
  getPortalCategories,
  getPortalsByCategory,
  searchPortals
}
