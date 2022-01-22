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

    let paramNivel = {};

    let x = 80;

    let text = this.add.text(x, 40, 'Facil');
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => 
    {
      paramNivel.cdMeteors = 2000;
      paramNivel.numFuel = 2;

      this.scene.start('space', paramNivel);
    });

    let text2 = this.add.text(x, 80, 'Intermedio');
    text2.setInteractive({ useHandCursor: true });
    text2.on('pointerdown', () => 
    {
      paramNivel.cdMeteors = 1000;
      paramNivel.numFuel = 3;

      this.scene.start('space', paramNivel);
    });

    let text3 = this.add.text(x, 120, 'Dificil');
    text3.setInteractive({ useHandCursor: true });
    text3.on('pointerdown', () => 
    {
      paramNivel.cdMeteors = 500;
      paramNivel.numFuel = 5;

      this.scene.start('space', paramNivel);
    });
  }
}