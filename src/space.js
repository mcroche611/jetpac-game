import Player from "./player.js";
import Meteor from "./meteor.js";

export default class Space extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
      super({ key: 'space' });

      
    }

    create(paramNivel)
    {
      this.cdMeteors = paramNivel.cdMeteors;
      this.numFuel = paramNivel.numFuel;

      this.explosion = this.sound.add('explosion');

      this.loadMap();

      this.player = new Player(this, 50, 150);

      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.player, this.walls, this.onWallCollision);

      this.meteors = this.add.group();

      this.myTimeout= this.time.addEvent({
        delay: this.cdMeteors,                // ms
        callback: this.createMeteor,
        args: [],
        callbackScope: this,
        loop: true
        });

      this.physics.add.collider(this.meteors, this.walls, this.onWallCollision); 
      this.physics.add.collider(this.meteors, this.platforms, this.explodeMeteor); 
    }

    loadMap()
    {
      const mapd = this.make.tilemap({ key: 'map' });
      const tilesetd = mapd.addTilesetImage('jetpac_tiles');
      const tileset2 = mapd.addTilesetImage('black_tiles');
      this.walls = mapd.createStaticLayer('paredes', tileset2, 0, 0);
      this.platforms = mapd.createStaticLayer('suelo', tilesetd, 0, 0);

      this.walls.setCollisionByProperty({ collision: true });
      this.platforms.setCollisionByProperty({ collision: true });

      //this.debugDraw(this.walls, this);
      //this.debugDraw(this.platforms, this);
    }

    createMeteor()
    {
        let x = Phaser.Math.Between(0,200);
        let y = Phaser.Math.Between(0,50);

        console.log (`Meteor ${x},${y}`);
        let meteor = new Meteor(this, x, y);
  
        this.meteors.add(meteor);
    }

    debugDraw(layer, scene)
    {
      const debugGraphics = scene.add.graphics().setAlpha(0.7)
      layer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
      })
    }

    getRandomInt(min, max) {
      let num = Math.random();
      return Math.floor((num + min) * max);
  }

    onWallCollision(p, w)
    {
      const margen= 17;
      if (p.x < margen)
        p.x= p.scene.scale.width - margen;
      if (p.x > p.scene.scale.width - margen){
        console.log("saliendo por la derecha");
        p.x= margen;
      }
        
      if (p.speedX != 0)
        p.body.setVelocityX(p.speedX);
    }

    explodeMeteor(meteor, platform)
    {
      meteor.scene.explosion.play();

      meteor.explode();
    }
}