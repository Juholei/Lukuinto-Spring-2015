'use strict';
var express = require('express');
var routes = require('./server/routes/index');
var pg = require('pg');
var app = express();
var env = process.env.NODE_ENV || 'development';

 // Setup view engine for server side templating
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// Setup path where all server templates will reside
app.set('views', 'server/templates');

if (env === 'development') {
  app.use(express.static('dist/client/'));
} else {
  app.use(express.static('client/'));
}

pg.connect(process.env.DATABASE_URL, function(err, client) {
  console.log(err);
  var query = client.query('SELECT * FROM testi');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});

app.use(express.static('client/'));
app.use('/', routes);

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      status: err.status,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
var portNumber = process.env.PORT || 3000;
var server = app.listen(portNumber, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
