var express = require('express');
var router = express.Router();

/* /api starting endpoint */
router.get('/foo', function(req, res, next) {
  res.json({
    foo: 'bar'
  })
});

router.post('/register', function(req, res, next) {
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
})

module.exports = router;
