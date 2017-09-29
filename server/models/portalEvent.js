const conn = require('../lib/db');

function addEvent(eventInfo,portalId, done){
    const sql = `INSERT INTO events (portalId, description, location, date, time, theme)
    VALUES (?,?,?,?,?,?)`

    conn.query(sql, [portalId, eventInfo.description, eventInfo.location, eventInfo.date, eventInfo.time, eventInfo.theme], function (error, results, fields) {
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

function getEventInfo(eventId, portalId, done) {
  const sql = `SELECT * FROM events WHERE id = ? and portalId = ?`
  conn.query(sql, [eventId, portalId], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to create event."
      }
      done(false, response)
    } else if (!error) {
      let response = results[0]
      done(true, response)
    }
  })
}

function updateEvent(eventId, eventInfo, done) {
  const sql = `UPDATE events  SET description=?, location=?, date=?, time=?, theme=?
    WHERE id =? AND portalId =?`

  conn.query(sql, [eventInfo.description, eventInfo.location, eventInfo.date, eventInfo.time, eventInfo.theme, eventId, eventInfo.portalId], function (error, results, fields) {
      if (error) {
        let response = {
          status: "fail",
          message: "Unable to update event."
        }
        done(false, response)
      } else if (!error) {
        let response = {
          status:"success",
          message:"Event updated."
        }
        done(true, response)
      }
    })
}

function removeEvent(eventId, portalId, done) {
  // `UPDATE events WHERE active = ? 2 to set to false or just false?`
}

module.exports = {
    addEvent,
    getEventInfo,
    updateEvent,
    removeEvent
}
