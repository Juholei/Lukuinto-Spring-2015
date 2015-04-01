'use strict';
var pg = require('pg');

var dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

module.exports = function(app) {
  app.get('/files/:id', function(req, res, next) {
    var id = req.params.id;

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
};
