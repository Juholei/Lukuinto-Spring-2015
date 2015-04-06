'use strict';
var pg = require('pg');

module.exports = function(app) {
  app.get('/games/', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }

      client.query('select id, data->>\'name\' AS name from games',
        function(err, readResult) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
          return console.error('error running query', err);
        }

        client.end();
        var json = JSON.stringify(readResult.rows);
        res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)});
        res.end(json);
      });
    });
  });
};
