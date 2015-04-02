'use strict';
var fs = require('fs');
var pg = require('pg');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.post('/savegamejson', function(req, res, next) {
    console.log('Game data received');
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) {
        console.log(err);
      }
      client.query('insert into games(data) values($1) returning id, data', [req.body], function(err, writeResult) {
        console.log(err, writeResult);
        done();
        client.end();
        res.json({id: writeResult.rows[0].id, json: writeResult.rows[0].data});
      });
    });
  });
};
