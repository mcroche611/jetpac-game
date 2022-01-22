/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    //Imágenes    
    this.load.setPath('assets/sprites/');

    this.load.image('fuel', 'fuel.png');
    this.load.image('spaceship', 'spaceship.png');
    this.load.image('tiles', 'tileset.png');
    this.load.spritesheet('player', 'jetpac.png',
    { frameWidth: 17, frameHeight: 24 });
    this.load.spritesheet('explosion', 'explosion.png', 
    { frameWidth: 24, frameHeight: 17 });
    this.load.spritesheet('meteor', 'meteor.png', 
    { frameWidth: 16, frameHeight: 14 });
    
    //Cargamos los fondos
    this.load.image('sky', 'sky-clouds.jpg');
    this.load.image('mountains', 'mountains1000.png');
    this.load.image('menuprincipal', 'menuprincipal.png');
        
    //Sonido
    this.load.setPath('assets/sounds/');
    this.load.audio('explosion', 'explosion.wav');
    this.load.audio('drop', 'drop.wav');
    this.load.audio('pick', 'pick.wav');
    this.load.audio('win', 'win.wav');
    this.load.audio('lose', 'lose.wav');

    //Tiled
    this.load.setPath('assets/map/');
    this.load.tilemapTiledJSON('map', 'space_map.json');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('mainmenu');
  }
}