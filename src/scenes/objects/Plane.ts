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
    this.body.setAllowGravity(true);
    this.body.setCollideWorldBounds(true, null, null, true);
    this.body.onWorldBounds = true;

    scene.physics.world.once("worldbounds", (body, _, collideDown) => {
      if (collideDown) {
        scene.gameOver();
      }
    })
  }

  movePlaneUp() {
    if (this.isMoving) {
      this.body.setVelocityY(-240);
    }
  }

  stopMoving() {
    this.isMoving = false;
    this.stop(); // Stop animation
  }
}