/**
 * Created by Filip on 2018-11-30.
 */
global.Phaser = {};
global.Phaser.GameObjects = {};
class MockedSprite {
  constructor(scene, x, y) {
    this.x = x;
    this.y = y;
  }
  preUpdate() {}
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setTexture(texture) {
    this.texture = texture;
  }
}
global.Phaser.GameObjects.Sprite = MockedSprite;

global.Phaser.Curves = {};
class MockedPath {
  lineTo() {
  }

  draw() {
  }

  getLength() {
    return 100
  }

  getPoint() {
    return {x: 1, y: 2}
  }
}
global.Phaser.Curves.Path = MockedPath;

global.mockedScene = {};
global.mockedScene.add = {};
global.mockedScene.add.graphics = function () {
  return {
    clear: function () {
    },
    lineStyle: function () {
    }
  }
};
