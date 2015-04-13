'use strict';
var pg = require('pg');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.post('/savegamejson', function(req, res, next) {
    if (process.env.LUKUSEIKKAILU_EDITOR_DISABLED === 'true') {
      var err = new Error('Not Found');
      err.status = 404;
      console.log(req.url);
      next(err);
    } else {
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
    }
  });
};
