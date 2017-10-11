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
  } else {
    fanPortal.addFanPortal(req.body, function (success, response) {
      if (!success) {
        res.status(401).json(response)
      } else {
        res.json(response)
      }
    })
  }
})

router.get("/categories", function (req, res, next) {
  fanPortal.getPortalCategories(function (success, response) {
    if (!success) {
      res.status(401).json(response)
    } else {
      res.json(response)
    }
  })
})
router.get("/categories/:categoryId", function(req,res,next){
  const categoryId = req.params.categoryId
  fanPortal.getPortalsByCategory(categoryId, function(success, response){
    if (!success) {
      res.status(401).json(response)
    } else {
      res.json(response)
    }
  })

})
router.get("/search/:searchTerm", function(req,res,next){
  const searchTerm = req.params.searchTerm
  fanPortal.searchPortals(searchTerm, function(success, response){
    if (!success) {
      res.status(404).json(response)
    } else {
      res.json(response)
    }
  })
})
router.get("/followingPortals/:userId", function(req, res,next){
  console.log( 'routes')
  const userId =  req.params.userId
  fanPortal.getFollowingPortals(userId, function(success, response){
    if (!success) {
      res.status(404).json(response)
    } else {
      res.json(response)
    }
  })
})
router.get("/:portalId/user/:userId", function (req, res, next) {
  const portalId = req.params.portalId
  const userId = req.params.userId
  fanPortal.getPortalInfo(portalId, userId, function (success, response) {
    if (!success) {
      res.status(404).json(response)
    } else {
      res.json(response)
    }
  })
})
router.put("/unfollow", function(req,res,next){
  const portalId = req.body.portalId
  const userId = req.body.userId
  fanPortal.unFollowPortal(portalId, userId, function (success, response) {
    if (!success) {
      res.status(401).json(response)
    } else {
      res.json(response)
    }
  })
})
router.put("/:portalId", function (req, res, next) {
  const portalId = req.params.portalId
  fanPortal.updatePortal(portalId, req.body, function (success, response) {
    if (!success) {
      res.status(401).json(response)
    } else {
      res.json(response)
    }
  })
})
router.post("/follow", function (req, res, next) {
  const portalId = req.body.portalId
  const userId = req.body.userId

  fanPortal.followPortal(portalId, userId, function (success, response) {
    if (!success) {
      res.status(401).json(response)
    } else {
      res.json(response)
    }
  })
})


module.exports = router;
