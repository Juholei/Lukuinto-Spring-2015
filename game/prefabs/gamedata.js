'use strict';
var Point = require('../prefabs/point');

function GameData() {}
GameData.prototype = {
  'startPoint': {
    'x': 246,
    'y': 118
  },
  'endPoint': {
    'x': 797,
    'y': 680
  },
  'points': [
    {
      'x': 341,
      'y': 120,
      'state': 'next',
      'task': {
        'question': 'Testikysymys 1',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 446,
      'y': 101,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 2',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 474,
      'y': 195,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 3',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 441,
      'y': 292,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 4',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 451,
      'y': 407,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 5',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 553,
      'y': 483,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 6',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 515,
      'y': 616,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 7',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    },
    {
      'x': 653,
      'y': 694,
      'state': 'unvisited',
      'task': {
        'question': 'Testikysymys 8',
        'answers': [
          {
            'text': 'Kyllä',
            'correctAnswer': true
          },
          {
            'text': 'Ei',
            'correctAnswer': false
          },
          {
            'text': 'Ehkä',
            'correctAnswer': false
          },
          {
            'text': 'Täh?',
            'correctAnswer': false
          }
        ]
      }
    }
  ],
  markPointAs: function(oldState, newState) {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === oldState) {
        this.points[i].state = newState;
        break;
      }
    }
  },
  getCurrentTask: function() {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === Point.STATES.CURRENT) {
        return this.points[i].task;
      }
    }
  }
};

module.exports = GameData;
