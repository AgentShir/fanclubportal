var express = require('express');
var router = express.Router();
const portalEvent = require('../models/portalEvent')


router.post("/:portalId", function(req, res,next){
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

router.get("/:portalId", function(req, res, next) {
  // portalId brings up the entire portal, what do I use to call just the event
})

router.put("/:portalId", function(req, res, next) {
  // Same question as above
})

  module.exports = router;
