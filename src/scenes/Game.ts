import Phaser from 'phaser';
import Plane from "./objects/Plane"
import GroundCeiling from "./objects/GroundCeiling"
import Rock from "./objects/Rock"
import LivesIndicator from "./objects/LivesIndicator"

export default class Demo extends Phaser.Scene {
  plane: Phaser.GameObjects.Sprite;
  // TODO more typing

  constructor() {
    super('GameScene');
    this.plane;
    this.grounds;
    this.lives = 3;
    this.isPaused = false;
    this.gameOverSign;
    this.scoreText;
    this.score = 0;
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
    // nvm we don't need a ceiling
    this.rocks = new Rock(this, "ground");
    this.ceilingRocks = new Rock(this, "ceiling");
    this.livesIndicator = new LivesIndicator(this, this.lives);
    this.gameOverSign = this.add.image(400, 300, "environ", "textGameOver.png")
      .setVisible(false)
      .setActive(false);

    this.scoreText = this.add.text(600, 40, `Score: ${this.score}`, { fontSize: '32px', fill: '#000' });

    this.input.keyboard.on("keyup",(event) => {
      // Mostly debug functions
      if (event.key === "r") {
        this.restart();
        return;
      }

      if (event.key === "m") {
        this.rocks.createNewRock();
        return;
      }

      if (event.key === "l") {
        this.livesIndicator.loseLife()
      }
    });

    this.physics.world.addCollider(this.plane, this.grounds, () => {
      this.gameOver();
    })

    this.time.addEvent({ delay: 500, loop: true, callback: () => {
      this.score += 1;
      this.scoreText.setText(`Score: ${this.score}`);
    }})
  }

  update() {
    this.plane.update();
    this.grounds.update();
    this.rocks.update();
    this.ceilingRocks.update();
  }

  gameOver() {
    // return; 
    console.log("GAME OVER");

    this.gameOverSign.setActive(true);
    this.gameOverSign.setVisible(true);

    this.time.removeAllEvents();

    this.plane.stopMoving();
    this.grounds.stopMoving();
    this.rocks.stopMoving();
    this.ceilingRocks.stopMoving();
    this.isPaused = true;
  }

  restart() {
    this.time.removeAllEvents();
    this.score = 0;
    this.scoreText.setText(`Score: ${this.score}`);

    this.gameOverSign.setVisible(false);
    this.gameOverSign.setActive(false);

    // Probably better with a game object pool? idk
    this.plane.destroyPlane();
    this.plane = new Plane(this);

    this.livesIndicator.restart();

    // Redo collider
    this.physics.world.addCollider(this.plane, this.grounds, () => {
      this.gameOver();
    })

    // TODO Restart grounds and rocks
    this.grounds.startMoving();
    this.rocks.restartMovement();
    this.ceilingRocks.restartMovement();

    this.time.addEvent({ delay: 500, loop: true, callback: () => {
      this.score += 1;
      this.scoreText.setText(`Score: ${this.score}`);
    }})
  }
}
