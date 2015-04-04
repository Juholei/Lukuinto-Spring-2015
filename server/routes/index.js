'use strict';
var path = require('path');

module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log('lol');
    res.sendFile('client/index.html', {root: path.normalize(__dirname + '/../..')});
  });
};
