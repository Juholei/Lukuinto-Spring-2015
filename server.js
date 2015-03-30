'use strict';
var express = require('express');
var routes = require('./server/routes/index');
var app = express();
var env = app.get('env');

if (env === 'development') {
  app.use(express.static('dist/client/'));
} else {
  app.use(express.static('client/'));
}

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
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       status: 'apua',
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
var portNumber = process.env.PORT || 3000;
var server = app.listen(portNumber, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
