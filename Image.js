/**
 * Created by Filip on 2018-07-26.
 */
class Image extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.x = x;
    this.y = y;
  }
}

export {Image};
