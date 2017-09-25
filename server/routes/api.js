var express = require('express');
var router = express.Router();


const fanPortals = require('../models/fanPortal');
/* /api starting endpoint */
router.get('/foo', function(req, res, next) {
  res.json({
    foo: 'bar'
  })
});


//FAN PORTAL ROUTES

router.post('/addPortals', function (req, res, next) {
  const teamName = req.body.teamName
  const fanClubName = req.body.fanClubName
  const teamLocation = req.body.teamLocation
  const fanClubLocation = req.body.fanClubLocation
  const description = req.body.description

console.log('in router add portal', req.body)
  if (teamName.length === 0) {
      res.status(401).json({
        message: 'Team Name must be entered.'
      })
    }else{
      fanPortals.addFanPortal(req.body, function(success,response){
        if(!success){
          res.status(401).json(response)
        }else{
          res.json(response)
        }
      })
    }
  })
module.exports = router;
