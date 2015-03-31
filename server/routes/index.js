'use strict';
var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var pg = require('pg');
var stream = require('stream');

var dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('client/index.html', {root: path.normalize(__dirname + '/../..')});
});

router.get('/files/:id', function(req, res, next) {
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

router.post('/upload', function(req, res, next) {
  req.busboy.on('file', function(fieldName, file, filename, encoding, mimetype) {
    console.log('Uploading: ' + filename + encoding + mimetype + typeof file + file);
    var string = '';
    var asdas = new stream.Readable();
    file.on('data', function(buffer) {
      // var part = buffer.read().toString();
      string += buffer.toString('hex');
      // console.log('stream data ' + buffer);
    });
    file.on('end', function() {
      console.log('final output ' + string);
      console.log('Did something');
      string = '\\x' + string;

      dbClient.query('INSERT INTO Files(filename, filesize, data) VALUES ($1, $2, $3)', ['filename', 22, string], function(err, writeResult) {
        console.log('err', err, 'pg writeResult', writeResult);
      });
    });
    // });
    // file.pipe(asdas);
    // file.pipe(string);
    // console.log(typeof string , string);
    res.json({'status': 'success'});
  });
  req.pipe(req.busboy);
    // var file = req.files.file;
    // if (path.extname(file.name).toLowerCase() === '.png') {
    //   fs.readFile(file.path, 'hex', function(err, imgData) {
    //     imgData = '\\x' + imgData;

    //     //remove the line below
    //     var stats = fs.statSync('client/assets/play/karttatausta.png');
    //     var fileSize = stats.size;
    //     console.log(fileSize);

    //     dbClient.query('INSERT INTO Files(filename, filesize, data) VALUES ($1, $2, $3)', [imgData, fileSize, imgData], function(err, writeResult) {
    //       console.log('err', err, 'pg writeResult', writeResult);
    //     });
    //   });
  // }
});
module.exports = router;
