import Phaser from "phaser";

export default class GroundCeiling extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene, {
      key: "environ",
      frame: "groundDirt.png",
      defaultKey: "environ",
      defaultFrame: "groundDirt.png",
      active: true,
      visible: true,
      quantity: 2,
      setOrigin: { x: 0, y: 1},
      setXY: { x: 0, y: 600, stepX: 808}, 
    })

    // stepX is the length of the image.
    // Basically just get the two of them next to each other
    // so when one is off screen we can move it to the right

    this.getChildren().forEach((ground) => {
      scene.physics.add.existing(ground);
      ground.body.setAllowGravity(false);
      ground.body.setImmovable(true);
      ground.body.setVelocityX(-300)
    })
  }

  stopMoving() {
    this.getChildren().forEach((ground) => {
      ground.body.setVelocityX(0); 
    })
  }

  startMoving() {
    this.getChildren().forEach((ground) => {
      ground.body.setVelocityX(-300); 
    })
  }

  update() {
    // It'll be nice if there's a callback for an object being out of bounds
    this.getChildren().forEach(ground => {
      if (ground.x < -808) {
        // If it's gone offscreen to the left, move it back to the right side.
        ground.setPosition(808, 600);
      }
    })
  }
}