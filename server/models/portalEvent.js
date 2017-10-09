const conn = require('../lib/db');

function addEvent(eventInfo, portalId, done) {
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
        status: "success",
        message: "New event created."
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
        status: "success",
        message: "Event updated."
      }
      done(true, response)
    }
  })
}

function removeEvent(eventId, done) {
  const sql = `UPDATE events SET active = 0
    WHERE id = ?`

  conn.query(sql, [eventId], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to remove event."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status: "success",
        message: "Event removed."
      }
      done(true, response)
    }
  })
}
function getMonthEvents(userId, done) {

  const sql = ` select f.id AS followId, f.portalId AS portalId, p.fanClubName, p.logo, e.id AS eventId, e.description, e.location, e.theme, DATE_FORMAT(e.date, '%M %d %Y') AS date, DATE_FORMAT(e.time, '%h:%i %p') AS time, r.going
from follow f
 join portals p on p.id = f.portalId
join events e on e.portalId = p.id
left join rsvp r on r.followId = f.id and  r.eventId = e.id
 where f.follow = 1 and f.userId= ?
 AND e.active = 1 AND MONTH(e.date) = MONTH(NOW()) AND YEAR(e.date) = YEAR(NOW()) AND e.date >= CURDATE()
 ORDER BY - e.date DESC , - e.time DESC`
  conn.query(sql, [userId], function (error, results, fields) {
    if (error) {
      let response = {
        status: 'fail',
        message: "Unable to retrieve following portals."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status: 'success',
        monthEvents: results
      }
      done(true, response)
    }
  })
}
function goingToEvent(eventId, followId, done) {
  const sql = `INSERT INTO rsvp (eventId, followId,going)
  VALUES(?,?,?)
  On duplicate key update going = 1`

  conn.query(sql, [eventId, followId, 1], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to create rsvp."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status: "success",
        message: "New event rsvp created."
      }
      done(true, response)
    }
  })
}
function notGoingToEvent(eventId, followId, done) {
  const sql = `UPDATE rsvp SET going = 0 WHERE eventId = ? AND followId = ?`
  conn.query(sql, [eventId, followId], function (error, results, fields) {
    if (error) {
      let response = {
        status: "fail",
        message: "Unable to change rsvp status."
      }
      done(false, response)
    } else if (!error) {
      let response = {
        status: "success",
        message: "rsvp status changed to not going."
      }
      done(true, response)
    }
  })
}
module.exports = {
  addEvent,
  getEventInfo,
  updateEvent,
  removeEvent,
  getMonthEvents,
  goingToEvent,
  notGoingToEvent
}
