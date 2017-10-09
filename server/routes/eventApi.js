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
router.get("/getMonthEvents/:userId", function(req, res,next){
    const userId =  req.params.userId
    portalEvent.getMonthEvents(userId, function(success, response){
      if (!success) {
        res.status(404).json(response)
      } else {
        res.json(response)
      }
    })
})
router.get("/:eventId/:portalId", function(req, res, next) {
  const eventId = req.params.eventId
  const portalId = req.params.portalId

  portalEvent.getEventInfo(eventId, portalId, function(success, response){
    if(!success){
      res.status(401).json(response)
    }else{
      res.json(response)
    }
  })
})

router.put("/:eventId", function(req, res, next) {
  const eventId = req.params.eventId
  portalEvent.updateEvent(eventId, req.body, function(success, response){
    if(!success){
      res.status(401).json(response)
    }else{
      res.json(response)
    }
  })
})

router.delete("/:eventId", function(req, res, next) {
  const eventId = req.params.eventId
  portalEvent.removeEvent(eventId, function(success, response){
    if(!success){
      res.status(401).json(response)
    }else{
      res.json(response)
    }
  })
})

router.post('/goingToEvent/:eventId',function(req,res,next){
  console.log(' going ')
  const eventId  = req.params.eventId
  const followId = req.body.followId
  portalEvent.goingToEvent(eventId,followId, function(success, response){
    if(!success){
      res.status(401).json(response)
    }else{
      res.json(response)
    }
  })
})
router.put('/notGoingToEvent/:eventId', function(req,res,next){
  console.log('not going')
  const eventId  = req.params.eventId
  const followId = req.body.followId
  portalEvent.notGoingToEvent(eventId,followId, function(success, response){
    if(!success){
      res.status(401).json(response)
    }else{
      res.json(response)
    }
  })
})
  module.exports = router;
