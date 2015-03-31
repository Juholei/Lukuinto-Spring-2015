'use strict';
var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('client/index.html', {root: path.normalize(__dirname + '/../..')});
});

router.get('/files/:id', function(req, res, next) {
  var id = req.params.id;
  var dbClient = new pg.Client(process.env.DATABASE_URL);
  dbClient.connect(function(err) {
    if (err) {
      console.log(err);
    }
  });

  dbClient.query('select data from Files where id = ' + id,
    function(err, readResult) {
    console.log('err', err, 'pg readResult', readResult);
    if (readResult.rows.length > 0) {
      res.type('png');
      res.send(readResult.rows[0].data);
    } else {
      var error = new Error('Not Found');
      error.status = 404;
      next(error);
    }
  });
});
module.exports = router;
