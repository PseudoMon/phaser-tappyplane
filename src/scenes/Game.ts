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
    this.input.keyboard.on("keyup",() => this.plane.movePlaneUp());
  }
}
