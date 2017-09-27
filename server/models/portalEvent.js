const conn = require('../lib/db');

function addEvent(eventInfo,portalId, done){
    const sql = `INSERT INTO events (portalId, description, location, date, time, theme)
    VALUES (?,?,?,?,?,?)`

    conn.query(sql, [portalId, eventInfo.description, eventInfo.location, eventInfo.date, eventInfo.time, eventInfo.theme], function (error, results, fields) {
        if (error) {
          console.log(error)
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
    addEvent
}