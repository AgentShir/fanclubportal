var express = require('express');
var router = express.Router();
const fanPortal = require('../models/fanPortal')


router.post('/', function (req, res, next) {
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

  
router.get("/:portalId", function(req,res,next){
    const portalId = req.params.portalId
    fanPortal.getPortalInfo(portalId, function(success,response){
      if(!success){
        res.status(401).json(response)
      }else{
        res.json(response)
      }
    })
  })

  module.exports = router;