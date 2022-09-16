import Phaser from "phaser";

export default class LivesIndicator extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene, {
      key: "environ",
      frame: "starBronze.png",
      defaultKey: "environ",
      defaultFrame: "starBronze.png",
      active: true,
      visible: true,
      repeat: 2,
      setXY: { x: 40, y: 40, stepX: 48  }, 
    })

    this.scene = scene;
  }

  loseLife() {
    // Gets the last active life, don't create if none exists
    const lifeToLose = this.getLast(true, false);
    if (!lifeToLose) return;

    this.scene.tweens.add({
      targets: lifeToLose,
      scaleX: 0,
      scaleY: 0,
      duration: 300,
      onComplete: () => {
        lifeToLose.setActive(false);
        lifeToLose.setVisible(false);

        if (this.getTotalUsed() === 0) {
          this.scene.gameOver();
        }
      }
    })
  }

  restart() {
    this.clear(true, true);
    this.createMultiple({
      key: "environ",
      frame: "starBronze.png",
      active: true,
      visible: true,
      repeat: 2,
      setXY: { x: 40, y: 40, stepX: 48  }, 
    })
  }
}