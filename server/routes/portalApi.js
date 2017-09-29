var express = require('express');
var router = express.Router();
const fanPortal = require('../models/fanPortal')


router.post('/', function (req, res, next) {
    const userId = req.body.userId
    const category = req.body.category
    const fanClubName = req.body.fanClubName
    const fanClubLocation = req.body.fanClubLocation
    const logo = req.body.logo
    const description = req.body.description

    if (fanClubName.length === 0) {
      res.status(401).json({
        message: 'Fan Club Name must be entered.'
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

router.put("/:portalId", function(req,res,next){
  const portalId = req.params.portalId
  fanPortal.updatePortal(portalId,req.body, function(success, response){
    if(!success){
      res.status(401).json(response)
    }else{
      res.json(response)
    }
  })
})
  module.exports = router;
