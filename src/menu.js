//Escena del menu principal
export default class Menu extends Phaser.Scene {
    constructor()
    { 
      super({key: 'menu'});
    }

    create()
    {
      //Añadimos la musica del menu de juego
      // this.musica = this.sound.add('menumusic', 
      // {volume: this.game.sound.volume * 0.5, loop: true});
      
      // this.focusCheck = new Phaser.GameObjects.Rectangle (this, 
      //   500, 256, 1000, 512, 0xfffffff, 0xfffffff).setInteractive();

      // //Si pulsamos la pantalla y no hay musica, empezara 
      // //a reproducirse la cancion del menu
      // this.focusCheck.on('pointerdown', () => {
      //   if (!this.musica.isPlaying)
      //     this.musica.play();
      // });

    let numObjects = 
    { 
      cdMeteors = 2,
      numFuel = 2
    }

    let text = this.add.text(200, 100, 'Facil');
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => this.scene.start('space', numObjects));

    let text2 = this.add.text(200, 200, 'Intermedio');
    text2.setInteractive({ useHandCursor: true });
    text2.on('pointerdown', () => this.scene.start('space', numObjects));

    let text3 = this.add.text(200, 300, 'Dificil');
    text3.setInteractive({ useHandCursor: true });
    text3.on('pointerdown', () => this.scene.start('space', numObjects));
  }
}