/**
 * Created by Filip on 2018-11-05.
 */
/** Class representing a locomotive */
class Locomotive extends Phaser.GameObjects.Sprite {
  /**
   * Create a locomotive. Arguments are the same as for the parent class.
   * @param scene
   * @param x
   * @param y
   */
  constructor(scene, grid, x, y, direction) {
    super(scene, x, y, 'locomotive');
    this.grid = grid;
    this.pathProgress = 0;
    this.graphics = scene.add.graphics();
    this.path = null;
    this.previousX = x;
    this.previousY = y;
    this.direction = direction;
    this._setAngle();
    this.depth = 1;

    this._addPathOfCurrentRail();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    //   console.log('Train entering ' + approachDirection + ' side of building at (' +
    //     this.currentBuilding.x + ',' + this.currentBuilding.y + '). Turn ' + turn);

    // Calculate pathProgress
    let speedPerMs = 0.1;
    let length = this.path.getLength();
    let pixelsSinceLast = speedPerMs * delta;
    let pathProgressDelta = pixelsSinceLast / length;
    this.pathProgress += pathProgressDelta;

    if (this.pathProgress < 1) {
      let vector = this.path.getPoint(this.pathProgress);
      this.previousX = this.x;
      this.previousY = this.y;
      this.setPosition(vector.x, vector.y);
      this._calculateDirection();
      this._setAngle();
    } else {
      this._addPathOfCurrentRail();
    }
  }

  _setAngle() {
    this.angle = {'N': 0, 'E': 90, 'S': 180, 'W': 270}[this.direction];
  }

  _addPathOfCurrentRail() {
    let position = this.grid.getPositionClosestTo(this.x, this.y);
    if (!this.grid.hasRail(position)) {
      return
    }
    let railSegment = this.grid.get(position);
    //console.log(this._direction());
    let newDirection = railSegment.newDirection(this.direction);
    //console.log(newDirection);
    this._addPath(newDirection);

  }

  _addPath(direction) {
    let tileSize = this.grid.tileSize;
    let deltas = {
      N: {dx: 0, dy: -tileSize},
      S: {dx: 0, dy: tileSize},
      W: {dx: -tileSize, dy: 0},
      E: {dx: tileSize, dy: 0}
    };
    let delta = deltas[direction];
    if (!delta) {
      throw '_addPath called with non-direction argument "' + direction + '"'
    }
    let path = new Phaser.Curves.Path(this.x, this.y);
    path.lineTo(this.x + delta.dx, this.y + delta.dy);
    //console.log('new path: dx=' + dx +', dy=' + dy);
    this.setPath(path)
  }

  _calculateDirection() {
    if (Math.abs(this.x - this.previousX) < Math.abs(this.y - this.previousY)) {
      this.direction = this.y > this.previousY ? 'S' : 'N';
    } else {
      this.direction = this.x > this.previousX ? 'E' : 'W';
    }
  }

  setPath(path) {
    this.path = path;
    this.pathProgress = 0;
    this.showPath();
  }

  showPath() {
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xffffff, 1);
    //this.path.draw(this.graphics);
  }
}

export {Locomotive};
