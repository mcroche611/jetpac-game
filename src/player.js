//import Hook from './hook.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite
{

  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y)
  {
    super(scene, x, y, 'player');
    this.score = 0;
    this.lives = 3;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);

    this.body.setAllowGravity(false);

    //Ajustamos el tamaño del collider. BCS

    this.body.setSize(this.width * 0.5, this.height * 0.8)
    //this.body.setSize(30, 50);
    this.body.offset.y = 0;

    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.updateScore();

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 14 }),
      frameRate: 5, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.play('idle');

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 72, end: 75 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 92, end: 95 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 92, end: 95 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('playeranim', { start: 72, end: 75 }),
      frameRate: 10,
      repeat: -1
    });
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t, dt)
  {
    super.preUpdate(t, dt);

    //console.log(`Player (${this.x}, ${this.y})`);
    if (this.cursors.up.isDown && this.body.onFloor())
    {
      this.body.setVelocityY(this.jumpSpeed);
    }
    else if (this.esc.isDown)
    {
      this.scene.scene.start('mainmenu');
    }
    else
    {
      this.body.setVelocity(0, 0);
      this.play('idle', true);
      //this.body.offset.x= 10;
    }

    // if (this.scene.physics.overlap(this.scene.bubbles, this)) {

    //   this.decreaseLives();
    //}
  }


  decreaseLives()
  {
    this.explosion = this.sound.add('explosion');
    this.lives--;

    if (this.lives <= 0)
      this.destroy();
  }
}
