import Phaser from "phaser";

export default class Plane extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 400, 300, "planes", "planeBlue1.png");
  }
}