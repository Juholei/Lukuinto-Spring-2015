// Generated on 2014-03-28 using generator-phaser-official 0.0.8-rc-2
'use strict';
var config = require('./config.json');
var _ = require('underscore');
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      scripts: {
        files: [
            'client/css/*',
            'client/index.html',
            'client/assets/*',
            'client/**/*.js',
            'client/*.js',
            '!client/main.js'
        ],
        options: {
          spawn: false,
          livereload: LIVERELOAD_PORT
        },
        tasks: ['build']
      },
      server: {
        files:  ['server.js', 'server/**/*.js'],
        tasks:  ['copy', 'express:dev', 'wait'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      editor: {
        files: [
            'editor/css/*',
            'editor/index.html',
            'editor/assets/*',
            'editor/game/**/*.js',
            'editor/game/*.js',
            '!editor/game/main.js'
        ],
        options: {
          spawn: false,
          livereload: LIVERELOAD_PORT
        },
        tasks: ['build:editor']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'dist/client/')
            ];
          }
        }
      }
    },
    open: {
      client: {
        path: 'http://localhost:9000'
      },
      server: {
        path: 'http://localhost:3000'
      }
    },
    copy: {
      dist: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['client/assets/**'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['client/plugins/*.js'], dest: 'dist/client/js/plugins/'},
          {expand: true, flatten: true, src: ['bower_components/**/build/*.js'], dest: 'dist/client/js/'},
          {expand: true, flatten: true, src: ['bower_components/**/build/*.map'], dest: 'dist/client/js/' },
          {expand: true, src: ['client/css/**'], dest: 'dist/'},
          {expand: true, src: ['client/index.html'], dest: 'dist/'},
          {expand: true, src: ['server/**'], dest: 'dist/'},
          {expand: true, src: ['server.js'], dest: 'dist/'}
        ]
      },
      editor: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['editor/assets/**'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['editor/game/plugins/*.js'], dest: 'dist/editor/js/plugins/'},
          {expand: true, flatten: true, src: ['editor/bower_components/**/build/*.js'], dest: 'dist/editor/js/'},
          {expand: true, flatten: true, src: ['editor/bower_components/**/build/*.map'], dest: 'dist/editor/js/' },
          {expand: true, src: ['editor/css/**'], dest: 'dist/'},
          {expand: true, src: ['editor/index.html'], dest: 'dist/'}
        ]
      }
    },
    browserify: {
      build: {
        src: ['client/main.js'],
        dest: 'dist/client/js/game.js'
      },
      buildEditor: {
        src: ['editor/game/main.js'],
        dest: 'dist/editor/js/game.js'
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/test/server.js'
        }
      }
    },
    uglify: {
      game: {
         files: {
          'dist/client/js/game.js': ['dist/client/js/game.js']
        }
      },
      editor: {
         files: {
          'dist/editor/js/game.js': ['dist/editor/js/game.js']
        }
      }
    }
  });

  grunt.registerTask('server', ['build', 'express:dev', 'open:server', 'watch']);
  grunt.registerTask('build', ['buildBootstrapper', 'browserify', 'copy']);
  grunt.registerTask('serve', ['build', 'connect:livereload', 'open:client', 'watch:scripts']);
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('prod', ['build', 'uglify']);
  grunt.registerTask('heroku', ['prod']);
  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function() {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('buildBootstrapper', 'builds the bootstrapper file correctly', function() {
    var stateFiles = grunt.file.expand('client/states/*.js');
    var gameStates = [];
    var statePattern = new RegExp(/(\w+).js$/);
    stateFiles.forEach(function(file) {
      var state = file.match(statePattern)[1];
      if (!!state) {
        gameStates.push({shortName: state, stateName: _.capitalize(state) + 'State'});
      }
    });

    config.gameStates = gameStates;
    console.log(config);
    var bootstrapper = grunt.file.read('templates/_main.js.tpl');
    bootstrapper = grunt.template.process(bootstrapper, {data: config});
    grunt.file.write('client/main.js', bootstrapper);
  });
};
