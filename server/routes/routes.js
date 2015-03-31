'use strict';
var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var pg = require('pg');
var stream = require('stream');

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file === 'routes.js') {
      return;
    }
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app);
  });
};
