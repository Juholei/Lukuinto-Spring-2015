'use strict';
var pg = require('pg');

var dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

module.exports = function(app) {
  app.post('/upload', function(req, res) {
    req.busboy.on('file', function(fieldName, file, filename, encoding, mimetype) {
      console.log('Uploading: ' + filename + encoding + mimetype + typeof file + file);
      var string = '';
      file.on('data', function(buffer) {
        // var part = buffer.read().toString();
        string += buffer.toString('hex');
        // console.log('stream data ' + buffer);
      });
      file.on('end', function() {
        console.log('final output ' + string);
        console.log('Did something');
        string = '\\x' + string;

        var query = 'INSERT INTO Files(filename, filesize, data) VALUES ($1, $2, $3)';
        dbClient.query(query, ['filename', 22, string], function(err, writeResult) {
          console.log('err', err, 'pg writeResult', writeResult);
        });
      });

      res.json({'status': 'success'});
    });
    req.pipe(req.busboy);
  });
};
