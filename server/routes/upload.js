'use strict';
var pg = require('pg');
var busboy = require('connect-busboy');

module.exports = function(app) {
  //Add busboy to app for parsing files from requests
  app.use(busboy());

  app.post('/upload', function(req, res) {
    //Set busboy to parse file-inputs
    req.busboy.on('file', function(fieldName, file, filename) {
      console.log('Uploading: ' + filename);

      //File data will be added to this string
      var fileData = '';

      //Add stream handler function for type data.
      //Function concatenates buffered data to fileData string in hex format.
      file.on('data', function(buffer) {
        fileData += buffer.toString('hex');
      });

      //Add stream handler for stream end.
      //Add \x to the beginning of the data to mark that it is hex formatted data.
      //Data string is then put to database.
      file.on('end', function() {
        fileData = '\\x' + fileData;
        console.log('File stream ended');

        //Get database client from pool and make query adding our data to the database.
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
          if (err) {
            return console.error('error fetching client from pool', err);
          }

          var query = 'INSERT INTO Files(filename, filesize, data) VALUES ($1, $2, $3) RETURNING id';
          client.query(query, [filename, 22, fileData], function(err, writeResult) {
            //call `done()` to release the client back to the pool
            done();
            if (err) {
              return console.error('error running query', err);
            }
            client.end();

            var responseObject = {
              status: 'success',
              id: writeResult.rows[0].id,
              url: req.get('host') + '/files/' + writeResult.rows[0].id
            };
            res.json(responseObject);
          });
        });
      });
    });
    req.pipe(req.busboy);
  });
};
