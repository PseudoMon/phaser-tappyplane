import Phaser from "phaser";

export default class Rock extends Phaser.GameObjects.Group {
  constructor(scene, location: "ground" | "ceiling") {
    super(scene, {
      defaultKey: "environ",
      defaultFrame: "rock.png",
      active: false,
      visible: false,
    })

    this.scene = scene;
    this.location = location;
    if (location === "ground") {
      this.createNewRock();  
    }
    else {
      this.createNewRock(1400)
    }
  }

  createNewRock(xpos: number = 900) {
    const originY = this.location === "ground" ? 1 : 0;
    const ypos = this.location === "ground" ? 600 : 0;
    const newRock = this.get(xpos, ypos);

    const randomizedHeightScaling = this.getRandomHeight();

    newRock.setActive(true);
    newRock.setVisible(true);
    newRock.setOrigin(0,originY);
    newRock.setScale(1, randomizedHeightScaling);

    if (this.location === "ceiling") newRock.setFlipY(true);

    this.scene.physics.add.existing(newRock);
    newRock.body.setImmovable(true);
    newRock.body.setVelocityX(-330);

    // newRock.body.setSize(60/100 * newRock.displayWidth, newRock.displayHeight - 20);

    // if (this.location === "ground") {
    //   newRock.body.setOffset(20/100 * newRock.displayWidth, 0);
    // }

    // if (this.location === "ceiling") {
    //   newRock.body.setOffset(20/100 * newRock.displayWidth, 0)
    // }

    // offset is still broken, idk

    console.log('made rokc')  
    console.log(this.getChildren().length)

    this.scene.physics.world.addCollider(this.scene.plane, newRock, () => this.scene.gameOver())
  }

  getRandomHeight() {
    return Phaser.Math.Between(10, 150) / 100;
  }

  update() {
    this.getChildren().forEach(rock => {
      if (rock.x <= -100) {
        // Marking it as inactive will allow it to be reused
        rock.setActive(false);
        rock.setVisible(false);

        this.createNewRock();
      }
    })
  }

  stopMoving() {
    this.getChildren().forEach(rock => rock.body.setVelocityX(0));
  }

  restartMovement() {
    console.log(this.getChildren())
    this.getChildren().forEach(rock => {
      rock.body.setVelocityX(-330)
    });
  }
}