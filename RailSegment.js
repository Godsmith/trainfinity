/**
 * Created by Filip on 2018-05-20.
 */



const downwardsOrLeftwards = Symbol('downwardsOrLeftwards');

let OPPOSITES = {'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E'};
let CONNECTED_POSITIONS = {
  'N': {x: 0, y: -1},
  'S': {x: 0, y: 1},
  'W': {x: -1, y: 0},
  'E': {x: 1, y: 0}
};

class RailSegment extends Phaser.GameObjects.Sprite {
  /**
   *
   * @param scene
   * @param x
   * @param y
   * @param directions Set of directions the rail goes in, e.g. Set(['N', 'S']) for a rail going north-south
   */
  constructor(scene, x, y, directions) {
    // TODO: change from halfrail later
    super(scene, x, y, 'halfrail');
    this.directions = new Set(directions);
    if (this.directions.size == 0) {
      throw new Error('No directions passed to RailSegment')
    }
    this.angle = 0;
    this.possibleCombinations = {};
    this.stationAllowed = {N: false, E: false, S: false, W: false};
    this._newDirections = {N: 'N', E: 'E', S: 'S', W: 'W'};
    this._connectedAdjacentPositionDeltas = [];
    this._updateGraphics()
  }

  canBuildOn(building) {
    // TODO: Currently can build on undefined and null. Should probably change this so that
    // Grid returns some kind of null object from get()
    if (!building) {
      return true
    }
    return building instanceof RailSegment;
  }

  /**
   * Create a new RailSegment by combining this rail segment with another segment
   * @param railSegment
   * @returns {RailSegment}
   */
  combine(railSegment) {
    if (!railSegment) {
      return this;
    }
    for (let direction of railSegment.directions) {
      this.directions.add(direction)
    }
    this._updateGraphics();
    return this;
  }

  /**
   * Return the connected positions, where 1 point is 1 tile.
   *
   * @return an array of position modifications, e.g. [{x: -1, y: 0}, {x: 1: y: 0}]
   */
  connectedAdjacentPositions() {
    return Array.from(this.directions).map(direction => CONNECTED_POSITIONS[direction]);
  }

  newDirection(direction) {
    if (this.directions.size == 1) {
      return this.directions.values().next().value
    }
    let directionsExceptReverse = new Set(this.directions);
    directionsExceptReverse.delete(OPPOSITES[direction]);
    // Later, do not return an arbitrary direction here
    return directionsExceptReverse.values().next().value;
  }

  _updateGraphics() {
    // TODO: Now > 2 is handled equal to = 2, the former should have unique textures
    let areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
    if (this.directions.size == 1) {
      this.setTexture('halfrail');
      let direction = this.directions.values().next().value;
      let angleFromDirection = {'N': 0, 'E': 90, 'S': 180, 'W': 270};
      this.angle = angleFromDirection[direction];
    } else if (areSetsEqual(this.directions, new Set(['N', 'S']))) {
      this.setTexture('rail');
      this.angle = 0;
    } else if (areSetsEqual(this.directions, new Set(['W', 'E']))) {
      this.setTexture('rail');
      this.angle = 90;
    } else if (this.directions.has('N') && this.directions.has('E')) {
      this.setTexture('railturn');
      this.angle = 0;
    } else if (this.directions.has('E') && this.directions.has('S')) {
      this.setTexture('railturn');
      this.angle = 90;
    } else if (this.directions.has('S') && this.directions.has('W')) {
      this.setTexture('railturn');
      this.angle = 180;
    } else if (this.directions.has('W') && this.directions.has('N')) {
      this.setTexture('railturn');
      this.angle = 270;
    }
  }
}

class RailSegmentFactory {

  constructor(scene) {
    this._scene = scene;
  }

  fromPositionList(positions) {
    let horizontal = (positions[0].y === positions[positions.length - 1].y);

    let directions = {};
    if (horizontal) {
      directions.first = ['E'];
      directions.middle = ['W', 'E'];
      directions.last = ['W'];
    } else {
      directions.first = ['N'];
      directions.middle = ['N', 'S'];
      directions.last = ['S'];
    }

    let directionArray = [];
    directionArray.push(new Set(directions.first));
    for (let i = 0; i < positions.length - 2; i++) {
      directionArray.push(new Set(directions.middle));
    }
    directionArray.push(new Set(directions.last));

    if (this[downwardsOrLeftwards](positions)) {
      directionArray.reverse()
    }

    let railSegments = [];
    for (let i = 0; i < positions.length; i++) {
      railSegments.push(new RailSegment(this._scene, positions[i].x, positions[i].y, directionArray[i]))
    }

    return railSegments;
  }

  [downwardsOrLeftwards](positions) {
    let first = positions[0];
    let last = positions[positions.length - 1];
    return (first.x > last.x) || (first.y < last.y)
  }
}

export {RailSegment, RailSegmentFactory};
