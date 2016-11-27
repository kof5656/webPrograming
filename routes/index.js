var express = require('express'),
    User = require('../models/User');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
