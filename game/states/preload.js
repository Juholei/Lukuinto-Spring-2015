'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(512, 384, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //Menu state assets
    this.load.image('menu-background', 'assets/menu/aloitus.png');
    this.load.spritesheet('start-button', 'assets/menu/aloita.png', 220, 96);
    this.load.spritesheet('fullscreenButton', 'assets/menu/ruutukoko.png', 284, 284);

    //Play state assets
    this.load.image('map', 'assets/play/karttatausta.png');
    this.load.spritesheet('point', 'assets/play/karttapiste.png', 98, 98);
    this.load.spritesheet('start-end', 'assets/play/lahto_maali.png', 190, 246);
    this.load.image('avatar_1', 'assets/play/avatar_nainen.png');
    this.load.image('avatar_2', 'assets/play/avatar_poika.png');

    //Quiz state assets
    this.load.image('taustakuva_kauppatori', 'assets/quiz/taustakuva_kauppatori.png');

    this.load.image('question-background', 'assets/quiz/kuvaus_teksti.png');
    this.load.image('answer-background', 'assets/quiz/valintojen_tausta.png');
    this.load.spritesheet('answer-button', 'assets/quiz/valintapainike.png', 332, 121);
    this.load.image('quiz-confirm', 'assets/quiz/vahvista.png');
    this.load.spritesheet('button', 'assets/quiz/painike.png', 220, 96);
    this.load.image('announcement-negative', 'assets/quiz/huomio_tausta.png');
    this.load.image('announcement-positive', 'assets/quiz/oikea_vastaus.png');

    this.load.image('etappi_1', 'assets/quiz/etappi_1.png');
    this.load.image('etappi_2', 'assets/quiz/etappi_2.png');
    this.load.image('etappi_3', 'assets/quiz/etappi_3.png');
    this.load.image('etappi_4', 'assets/quiz/etappi_4.png');
    this.load.image('etappi_5_ilves', 'assets/quiz/etappi_5_ilves.png');
    this.load.image('etappi_5_kaksoset', 'assets/quiz/etappi_5_kaksoset.png');
    this.load.image('etappi_5_leijona', 'assets/quiz/etappi_5_leijona.png');
    this.load.image('etappi_5_otava', 'assets/quiz/etappi_5_otava.png');
    this.load.image('etappi_6', 'assets/quiz/etappi_6.png');
    this.load.image('etappi_7', 'assets/quiz/etappi_7.png');

    this.load.image('game_over_background', 'assets/menu/loppu.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
