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

    this.setOrigin(0.5, 1);

    console.log("Creating player");

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    //Ajustamos el tamaño del collider. BCS

    //this.body.setSize(this.width * 0.5, this.height * 0.8)
    // //this.body.setSize(30, 50);
    this.body.offset.y = 0;

    this.speed = 100;
    this.jumpSpeed = -100;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    console.log("Finish player");
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
    if (this.cursors.up.isDown)
    {
      //this.play('fly', true);
      this.body.setVelocityY(this.jumpSpeed);
    }
    
    if (this.cursors.right.isDown)
    {
      this.flipX = false;
      this.body.setVelocityX(this.speed);
    }
    else if (this.cursors.left.isDown)
    {
      this.flipX = true;
      this.body.setVelocityX(-this.speed);
    }
    else
    {
      this.body.setVelocityX(0);
    }
    
    if (this.body.onFloor())
    {

      //console.log('velocity ', this.body.velocity.x);
      if (this.body.velocity.x != 0) 
      {
        this.play('walk', true);
      }
      else
        this.play('walk', false);
    }
    else
    {
      this.play('fly', true);
    }
    
    if (this.esc.isDown)
    {
      this.scene.scene.start('menu');
    }
    else
    {
      // this.body.setVelocity(0, 0);
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
