import Phaser from "phaser";

export default class Plane extends Phaser.GameObjects.Sprite {
  isMoving: boolean;

  constructor(scene) {
    super(scene, 400, 300, "planes", "planeBlue1.png");

    this.isMoving = true;

    scene.add.existing(this);

    scene.anims.create({
      key: "planeMoving",
      frames: scene.anims.generateFrameNames(
        "planes", { prefix: "planeBlue", start: 1, end: 3, suffix: ".png"}
      ),
      repeat: -1,
      yoyo: true,
      frameRate: 20,
    });

    this.play("planeMoving");
    
    scene.physics.add.existing(this);
    this.body.setAccelerationY(300)
    this.body.setAllowGravity(true);
    this.body.setCollideWorldBounds(true, null, null, true);
    this.body.onWorldBounds = true;
  }

  movePlaneUp() {
    if (this.isMoving) {
      this.body.setVelocityY(-280);
    }
  }

  stopMoving() {
    this.isMoving = false;
    this.stop(); // Stop animation
  }
}