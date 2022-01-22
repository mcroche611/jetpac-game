
export default class Space extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor(numObjects) 
    {
      super({ key: 'space' });

      this.cdMeteors = numObjects.cdMeteors;
      this.numFuel = numObjects.numFuel;
    }

    create()
    {
        const mapd = this.make.tilemap({ key: 'map' });
        const tilesetd = mapd.addTilesetImage('map', 'space_map');
        this.walls = mapd.createStaticLayer('paredes', tilesetd, 0, 0);
        this.platforms = mapd.createStaticLayer('suelo', tilesetd, 100, -200);

        this.walls.setCollisionByProperty({ collision: true });
        this.platforms.setCollisionByProperty({ collision: true });
    }
}