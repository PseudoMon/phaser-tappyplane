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

  getRandomHeight() {
    return Phaser.Math.Between(10, 150) / 100
  }

  create() {
    this.plane = new Plane(this);
    this.grounds = new GroundCeiling(this, "below");
    //this.grounds = new GroundCeiling(this, "above");

    this.input.on("pointerup", () => this.plane.movePlaneUp());
    this.input.keyboard.on("keyup",(event) => {
      if (event.key === "r") {
        this.restart();
        return;
      }
      this.plane.movePlaneUp()
    });

    this.physics.world.addCollider(this.plane, this.grounds, () => {
      this.gameOver();
    })

    const rockGround = this.add.image(900, 600, "environ", "rock.png");
    this.rockGround = rockGround;
    rockGround.setOrigin(0, 1)
    rockGround.setScale(1, this.getRandomHeight());
    this.physics.add.existing(rockGround);
    rockGround.body.setAllowGravity(false);
    rockGround.body.setVelocityX(-330)

    const rockCeiling = this.add.image(1500, 0, "environ", "rockDown.png");
    this.rockCeiling = rockCeiling;
    rockCeiling.setOrigin(0, 0);
    rockCeiling.setScale(1, this.getRandomHeight());
    this.physics.add.existing(rockCeiling);
    rockCeiling.body.setAllowGravity(false);
    rockCeiling.body.setVelocityX(-330);
  }

  update() {
    this.grounds.update();

    if (this.rockGround.x <= -100) {
      this.rockGround.setX(900)
      this.rockGround.setScale(1, this.getRandomHeight());
    }

    if (this.rockCeiling.x <= -100) {
      this.rockCeiling.setX(1500)
      this.rockCeiling.setScale(1, this.getRandomHeight());
    }
  }

  gameOver() {
    this.plane.stopMoving();
    this.grounds.stopMoving();
  }

  restart() {
    // Probably better with a game object pool? idk
    this.plane.destroy();
    this.plane = new Plane(this);
    this.physics.world.addCollider(this.plane, this.grounds, () => {
      this.gameOver();
    })

    this.grounds.startMoving();
  }
}
