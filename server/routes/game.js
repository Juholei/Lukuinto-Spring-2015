'use strict';
var pg = require('pg');

module.exports = function(app) {
  app.get('/game/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }

      client.query('select data from games where id = $1', [id],
        function(err, readResult) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
          return console.error('error running query', err);
        }

        if (readResult.rows.length === 0) {
          var error = new Error('Not Found');
          error.status = 404;
          console.log(req.url);
          next(error);
        } else {
          var json = JSON.stringify(readResult.rows[0]);
          res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)});
          res.end(json);
        }
      });
    });
  });
};
