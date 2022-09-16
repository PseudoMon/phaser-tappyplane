import Phaser from 'phaser';
import Plane from "./objects/Plane"
import GroundCeiling from "./objects/GroundCeiling"
import Rock from "./objects/Rock"

export default class Demo extends Phaser.Scene {
  plane: Phaser.GameObjects.Sprite;

  constructor() {
    super('GameScene');
    this.plane;
    this.grounds;
    this.isPaused = false;
  }

  preload() {
    this.load.atlasXML("planes", "assets/planes.png", "assets/planes.xml");
    this.load.atlasXML("environ", "assets/sheet.png", "assets/sheet.xml");
  }

  getRandomHeight() {
    return Phaser.Math.Between(10, 150) / 100
  }

  create() {
    this.plane = new Plane(this);
    this.grounds = new GroundCeiling(this, "below");
    //this.grounds = new GroundCeiling(this, "above");
    this.rocks = new Rock(this, "ground");
    this.ceilingRocks = new Rock(this, "ceiling");

    this.input.on("pointerup", () => this.plane.movePlaneUp());
    this.input.keyboard.on("keyup",(event) => {
      if (event.key === "r") {
        this.restart();
        return;
      }

      if (event.key === "m") {
        this.rocks.createNewRock();
        return;
      }
    });

    this.physics.world.addCollider(this.plane, this.grounds, () => {
      this.gameOver();
    })
  }

  update() {
    this.plane.update();
    this.grounds.update();
    this.rocks.update();
    this.ceilingRocks.update();
  }

  gameOver() {
    return; 
    this.plane.stopMoving();
    this.grounds.stopMoving();
    this.rocks.stopMoving();
    this.ceilingRocks.stopMoving();
    this.isPaused = true;
  }

  restart() {
    // Probably better with a game object pool? idk
    this.plane.destroyPlane();
    this.plane = new Plane(this);
    this.physics.world.addCollider(this.plane, this.grounds, () => {
      this.gameOver();
    })

    this.grounds.startMoving();
    this.rocks.restartMovement();
    this.ceilingRocks.restartMovement();
  }
}
