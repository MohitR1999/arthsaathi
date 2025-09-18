var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message : "Money handling service up and running!" })
});

module.exports = router;
