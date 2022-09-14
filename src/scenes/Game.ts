import Phaser from 'phaser';

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
    this.plane = this.add.sprite(400, 300, "planes", "planeBlue1.png").setScale(0.8, 0.8);

    this.anims.create({
      key: "planeMoving",
      frames: this.anims.generateFrameNames(
        "planes", { prefix: "planeBlue", start: 1, end: 3, suffix: ".png"}
      ),
      repeat: -1,
      yoyo: true,
      frameRate: 20,
    });

    this.plane.play("planeMoving");

    this.physics.add.existing(this.plane);
    this.plane.body.setAllowGravity();

    this.input.on("pointerup", () => this.movePlaneUp(this.plane));

    this.input.keyboard.on("keyup",() => this.movePlaneUp(this.plane));
  }

  movePlaneUp(plane) {
    plane.body.setVelocityY(-240)
  }
}
