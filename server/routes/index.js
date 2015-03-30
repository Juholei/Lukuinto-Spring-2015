'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('client/index.html', {root: path.normalize(__dirname + '/../..')});
});

module.exports = router;
