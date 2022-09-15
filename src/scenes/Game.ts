import Phaser from 'phaser';
import Plane from "./objects/Plane"
import GroundCeiling from "./objects/GroundCeiling"

export default class Demo extends Phaser.Scene {
  plane: Phaser.GameObjects.Sprite;

  constructor() {
    super('GameScene');
    this.plane;
    this.grounds;
  }

  preload() {
    this.load.atlasXML("planes", "assets/planes.png", "assets/planes.xml");
    this.load.atlasXML("environ", "assets/sheet.png", "assets/sheet.xml");
  }

  create() {
    this.plane = new Plane(this);
    this.grounds = new GroundCeiling(this);

    this.input.on("pointerup", () => this.plane.movePlaneUp());
    this.input.keyboard.on("keyup",(event) => {
      if (event.key === "r") {
        this.restart();
        return;
      }
      this.plane.movePlaneUp()
    });
  }

  update() {
    this.grounds.update();
  }

  gameOver() {
    this.plane.stopMoving();
    this.grounds.stopMoving();
  }

  restart() {
    // Probably better with a game object pool? idk
    this.plane.destroy();
    this.plane = new Plane(this);

    this.grounds.startMoving();
  }
}
