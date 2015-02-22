
'use strict';
var Point = require('../prefabs/point');

function Play() {}
Play.prototype = {
  create: function() {
    var Point = require('../prefabs/point');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.sprite = new Point(this.game, this.game.width/2, this.game.height/2);
    this.game.add.existing(this.sprite);
    this.sprite.inputEnabled = true;
    
    // this.game.physics.arcade.enable(this.sprite);
    // this.sprite.body.collideWorldBounds = true;
    // this.sprite.body.bounce.setTo(1,1);
    // this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
    // this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

    this.sprite.events.onInputDown.add(this.clickListener, this);
  },
  update: function() {

  },
  clickListener: function() {
    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Tehtävä:', { font: '16px Arial', fill: '#000', align: 'center'});

  }
};

module.exports = Play;