var express = require('express');
var router = express.Router();
const user = require('../models/user');
const portalEvent = require('../models/portalEvent')
const fanPortal = require('../models/fanPortal')

/* /api starting endpoint */
router.get('/foo', function (req, res, next) {
  res.json({
    foo: 'bar'
  })
});


router.post('/register', function (req, res, next) {
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  if (fname.length === 0 || lname.length === 0 || username.length === 0 || password.length == 0 || email.length === 0) {
    let response = {
      status: "fail",
      message: "All fields must be completed"
    }
    res.status(401).json(response)
  } else {
    user.registerUser(req.body, function (success, response) {
      if (!success) {
        res.status(401).json(response)
      } else {
        res.json(response)
      }
    })
  }
})

router.post("/token", function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  if (username.length === 0 || password.length === 0) {
    res.status(401).json({
      message: 'username and password must be entered.'
    })
  }else{
    user.login(username, password, function(success, response){
        if(!success){
          res.status(401).json(response)
        }else{
          res.json(response)
        }
    })
  }
})

router.post('/addPortals', function (req, res, next) {
  const userId = req.body.userId
  const teamName = req.body.teamName
  const fanClubName = req.body.fanClubName
  const teamLocation = req.body.teamLocation
  const fanClubLocation = req.body.fanClubLocation
  const logo = req.body.logo
  const description = req.body.description

  if (teamName.length === 0) {
    res.status(401).json({
      message: 'Team Name must be entered.'
    })
  }else{
    fanPortal.addFanPortal(req.body, function(success,response){
      if(!success){
        res.status(401).json(response)
      }else{
        res.json(response)
      }
    })
  }
})

//EVENT ROUTES
router.post("/:portalId/addEvent", function(req, res,next){
  const portalId = req.params.portalId
  if(req.body.description.length === 0 || req.body.location.length === 0){
    res.status(401).json({
      message: 'Description and Location must be entered.'
    })
  }else{
    portalEvent.addEvent(req.body, portalId, function(success,response){
      if(!success){
        res.status(401).json(response)
      }else{
        res.json(response)
      }
    })
  }
})
module.exports = router;
