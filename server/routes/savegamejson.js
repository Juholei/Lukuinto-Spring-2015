'use strict';
var fs = require('fs');
var pg = require('pg');
var path = require('path');

module.exports = function(app) {
  app.get('/savegamejson', function(req, res, next) {
    fs.readFile(path.normalize(__dirname + '/../../client/assets/gamedata.json'), function(err, data) {
      console.log(data.toString());
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
          console.log(err);
        }
        client.query('insert into games(data) values($1)', [data.toString()], function(err, writeResult) {
          console.log(err, writeResult);
          done();
          client.end();
          res.json({status: 'something must have happened'});
        });
      });
    });
  });
};
