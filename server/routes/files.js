'use strict';
var pg = require('pg');

module.exports = function(app) {
  app.get('/files/:id', function(req, res, next) {
    var id = req.params.id;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }

      client.query('select data from Files where id = ' + id,
        function(err, readResult) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
          return console.error('error running query', err);
        }

        client.end();

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
  });
};
