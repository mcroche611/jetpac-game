import Boot from "./boot.js";
import Menu from "./menu.js";
import Space from "./space.js";

window.onload = () =>
{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [Boot, Menu, Space],
        physics: 
        {
            default: 'arcade',
            arcade: 
            {
                gravity: { y: 500 },
                debug: true
            }
        }
    };

    new Phaser.Game(config);
};