'use strict';
var path = require('path');

module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log('Index route: ' + path.normalize(__dirname + '/../..'));
    res.sendFile('client/index.html', {root: path.normalize(__dirname + '/../..')});
  });
};
