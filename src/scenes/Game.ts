import Phaser from 'phaser';
import Plane from "./objects/Plane"

export default class Demo extends Phaser.Scene {
  plane: Phaser.GameObjects.Sprite;

  constructor() {
    super('GameScene');
    this.plane;
  }

  preload() {
    this.load.atlasXML("planes", "assets/planes.png", "assets/planes.xml");
    this.load.atlasXML("environ", "assets/sheet.png", "assets/sheet.xml");
  }

  create() {
    this.plane = new Plane(this);

    this.input.on("pointerup", () => this.plane.movePlaneUp());
    this.input.keyboard.on("keyup",(event) => {
      if (event.key === "r") {
        this.restart();
        return;
      }
      this.plane.movePlaneUp()
    });

    // const ground = this.add.image(0, 600, "environ", "groundDirt.png");
    // ground.setOrigin(0, 1);

    // this.tweens.add({
    //   targets: grounds.getChildren(),
    //   x: -800,
    //   duration: 6000,
    // })

    // this.physics.add.existing(ground, true);

    const grounds = this.add.group({
      key: "environ",
      frame: "groundDirt.png",
      defaultKey: "environ",
      defaultFrame: "groundDirt.png",
      active: true,
      visible: true,
      quantity: 2,
      setOrigin: { x: 0, y: 1},
      setXY: { x: 0, y: 600, stepX: 808},
    });

    this.grounds = grounds;
    
   grounds.getChildren().forEach((ground) => {
    this.physics.add.existing(ground);

    ground.body.setAllowGravity(false);

    ground.body.setVelocityX(-300)
   })

    
  }

  update() {
    // It'll be nice if there's a callback for an object being out of bounds
    this.grounds.getChildren().forEach(ground => {
      if (ground.x < -808) {
        // If it's gone offscreen to the left, move it back to the right side.
        ground.setPosition(808, 600);
      }
    })
  }

  restart() {
    // Probably better with a game object pool? idk
    this.plane.destroy();
    this.plane = new Plane(this);
  }
}
