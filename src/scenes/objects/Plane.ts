import Phaser from "phaser";

export default class Plane extends Phaser.GameObjects.Sprite {
  isMoving: boolean;
  isMovingLeft: boolean;

  constructor(scene) {
    super(scene, 400, 300, "planes", "planeBlue1.png");

    this.isMoving = true;
    this.isMovingLeft = false;

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

    this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  movePlaneUp() {
    this.body.setVelocityY(-280);
  }

  movePlaneLeft() {
    this.body.setVelocityX(-180);
  }

  stopMoving() {
    this.isMoving = false;

    this.stop(); // Stop animation
  }

  update() {
    // Don't respond if the plane is not moving
    if (!this.isMoving) return

    // When the jump key was tapped, jump
    if (Phaser.Input.Keyboard.JustDown(this.jumpKey)) {
      this.movePlaneUp();
    }

    // When left key is down, go right.
    // when it's not, gives acceleration so they'll be at the
    // middle of the screen
    if (this.leftKey.isDown) {
      this.movePlaneLeft();
    }

    else if (this.x < 400) {
      this.body.setAccelerationX(200);
    }
    else if (this.x > 400) {
      this.body.setAccelerationX(0);
      this.body.setVelocityX(0);
    }
  }

  destroyPlane() {
    this.destroy()
  }
}