import Phaser from "phaser";

export default class LivesIndicator extends Phaser.GameObjects.Group {
  constructor(scene, initLives) {
    super(scene, {
      key: "environ",
      frame: "starBronze.png",
      defaultKey: "environ",
      defaultFrame: "starBronze.png",
      active: true,
      visible: true,
      repeat: initLives - 1,
      setXY: { x: 40, y: 40, stepX: 48  }, 
    })

    this.scene = scene;
    this.isImmune = false;
    // For a bit after losing a life, player is immune from losing
    // further lives
  }

  loseLife() {
    // Don't lose when is immune
    if (this.isImmune) return;

    // Gets the last active life, don't create if none exists
    const lifeToLose = this.getLast(true, false);
    if (!lifeToLose) return;

    this.isImmune = true;

    this.scene.tweens.add({
      targets: lifeToLose,
      scaleX: 0,
      scaleY: 0,
      duration: 500,
      onComplete: () => {
        lifeToLose.setActive(false);
        lifeToLose.setVisible(false);
        this.isImmune = false;

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