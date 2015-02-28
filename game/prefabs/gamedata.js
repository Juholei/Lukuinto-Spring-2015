'use strict';

function GameData() {
}
GameData.prototype = {
  "startPoint": {
    "x": 246,
    "y": 118
  },
  "endPoint": {
    "x": 797,
    "y": 680
  },
  "points": [
    {
      "x": 341,
      "y": 120,
      "state": "visited"
    },
    {
      "x": 446,
      "y": 101,
      "state": "current"
    },
    {
      "x": 474,
      "y": 195,
      "state": "next"
    },
    {
      "x": 441,
      "y": 292,
      "state": "unvisited"
    },
    {
      "x": 451,
      "y": 407,
      "state": "unvisited"
    },
    {
      "x": 553,
      "y": 483,
      "state": "unvisited"
    },
    {
      "x": 515,
      "y": 616,
      "state": "unvisited"
    },
    {
      "x": 653,
      "y": 694,
      "state": "unvisited"
    }
  ]
};

module.exports = GameData;
