'use strict';
var path = require('path');

module.exports = function(app) {
  app.get('/editor', function(req, res) {
    console.log('lol');
    res.sendFile('editor/index.html', {root: path.normalize(__dirname + '/../..')});
  });
};
