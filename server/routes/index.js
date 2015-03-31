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

router.get('/testikuva/', function(req, res, next) {
  var dbClient = new pg.Client(process.env.DATABASE_URL);
  dbClient.connect(function(err, client) {
    if (err) {
      console.log(err);
    }
  });

  dbClient.query('select data from Files limit 1',
    function(err, readResult) {
    console.log('err', err, 'pg readResult', readResult);
    res.type('png');
    res.send(readResult.rows[0].data);
  });
});
module.exports = router;
