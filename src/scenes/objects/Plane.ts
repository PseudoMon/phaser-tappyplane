import Phaser from "phaser";

export default class Plane extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 400, 300, "planes", "planeBlue1.png");

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
  }

  movePlaneUp() {
    this.body.setVelocityY(-240);
  }
}