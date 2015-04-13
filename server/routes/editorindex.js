'use strict';
var path = require('path');

module.exports = function(app) {
  app.get('/editor', function(req, res, next) {
    if (process.env.LUKUSEIKKAILU_EDITOR_DISABLED === 'true') {
      var err = new Error('Not Found');
      err.status = 404;
      console.log(req.url);
      next(err);
    } else {
      res.sendFile('editor/index.html', {root: path.normalize(__dirname + '/../..')});
    }
  });
};
