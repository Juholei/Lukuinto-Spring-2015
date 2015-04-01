'use strict';
var pg = require('pg');
var busboy = require('connect-busboy');

var dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

module.exports = function(app) {
  app.use(busboy());
  app.post('/upload', function(req, res) {
    console.log('Post request received');
    req.busboy.on('file', function(fieldName, file, filename) {
      console.log('Uploading: ' + filename);
      var string = '';
      file.on('data', function(buffer) {
        console.log('Handling data');
        string += buffer.toString('hex');
      });
      file.on('end', function() {
        string = '\\x' + string;
        console.log('File stream ended');
        var query = 'INSERT INTO Files(filename, filesize, data) VALUES ($1, $2, $3) RETURNING id';
        dbClient.query(query, [filename, 22, string], function(err, writeResult) {
          console.log('err', err, 'pg writeResult', writeResult);
          console.log(writeResult.rows[0].id);
          res.json({'status': 'success', 'url':  'https://lukuseikkailu.herokuapp.com/files/' + writeResult.rows[0].id});
        });
      });
    });
    console.log('Sending response');
    console.log('Piping to busboy');
    req.pipe(req.busboy);
  });
};
