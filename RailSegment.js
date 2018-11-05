/**
 * Created by Filip on 2018-05-20.
 */



const downwardsOrLeftwards = Symbol('downwardsOrLeftwards');

class RailSegment extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.angle = 0;
    this.possibleCombinations = {};
    this.stationAllowed = {N: false, E: false, S: false, W: false};
    this._newDirections = {N: 'N', E: 'E', S: 'S', W: 'W'};
    this._connectedAdjacentPositionDeltas = [];
  }

  canBuildOn(railSegment) {
    if (railSegment) {
      return railSegment.constructor.name in this.possibleCombinations;
    } else {
      return true;
    }
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
    let railSegmentClass = this.possibleCombinations[railSegment.constructor.name];
    return new railSegmentClass(this.scene, this.x, this.y);
  }

  /**
   * Return the connected positions, where 1 point is 1 tile.
   *
   * @return an array of position modifications, e.g. [{x: -1, y: 0}, {x: 1: y: 0}]
   */
  connectedAdjacentPositions() {
    return this._connectedAdjacentPositionDeltas;
  }

  newDirection(direction) {
    if (!this._newDirections[direction]) {
      return direction
    }
    return this._newDirections[direction]
  }
}

class NRailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'halfrail', frame);
    this.angle = 0;
    this.possibleCombinations = {
      ERailSegment: NERailSegment,
      WRailSegment: NWRailSegment,
      SRailSegment: NSRailSegment
    };
    this.stationAllowed['E'] = this.stationAllowed['W'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}];
    this._newDirections = {'S': 'N'}
  }
}
class ERailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'halfrail', frame);
    this.angle = 90;
    this.possibleCombinations = {
      NRailSegment: NERailSegment,
      SRailSegment: SERailSegment,
      WRailSegment: WERailSegment
    };
    this.stationAllowed['N'] = this.stationAllowed['S'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 1, y: 0}];
    this._newDirections = {'W': 'E'}
  }
}
class SRailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'halfrail', frame);
    this.angle = 180;
    this.possibleCombinations = {
      ERailSegment: SERailSegment,
      WRailSegment: SWRailSegment,
      NRailSegment: NSRailSegment
    };
    this.stationAllowed['E'] = this.stationAllowed['W'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: 1}];
    this._newDirections = {'N': 'S'}
  }
}
class WRailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'halfrail', frame);
    this.angle = 270;
    this.possibleCombinations = {
      NRailSegment: NWRailSegment,
      SRailSegment: SWRailSegment,
      ERailSegment: WERailSegment
    };
    this.stationAllowed['N'] = this.stationAllowed['S'] = true;
    this._connectedAdjacentPositionDeltas = [{x: -1, y: 0}];
    this._newDirections = {'E': 'W'}
  }
}

class NSRailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'rail', frame);
    this.angle = 0;
    this.stationAllowed['E'] = this.stationAllowed['W'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}, {x: 0, y: 1}];
  }
}

class WERailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'rail', frame);
    this.angle = 90;
    this.stationAllowed['N'] = this.stationAllowed['S'] = true;
    this._connectedAdjacentPositionDeltas = [{x: -1, y: 0}, {x: 1, y: 0}];
  }
}

class NERailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'railturn', frame);
    this.angle = 0;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}, {x: 1, y: 0}];
    this._newDirections = {'S': 'E', 'W': 'N'}
  }
}

class SERailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'railturn', frame);
    this.angle = 90;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: 1}, {x: 1, y: 0}];
    this._newDirections = {'N': 'E', 'W': 'S'}
  }
}

class SWRailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'railturn', frame);
    this.angle = 180;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: 1}, {x: -1, y: 0}];
    this._newDirections = {'N': 'W', 'E': 'S'}
  }
}

class NWRailSegment extends RailSegment {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'railturn', frame);
    this.angle = 270;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}, {x: -1, y: 0}];
    this._newDirections = {'S': 'W', 'E': 'N'}
  }
}

class RailSegmentFactory {

  constructor (scene) {
    this._scene = scene;
  }

  fromPositionList(positions) {
    let horizontal = (positions[0].y === positions[positions.length - 1].y);
    let classes = {};
    if (horizontal) {
      classes.first = ERailSegment;
      classes.middle = WERailSegment;
      classes.last = WRailSegment;
    } else {
      classes.first = NRailSegment;
      classes.middle = NSRailSegment;
      classes.last = SRailSegment;
    }

    let classArray = [];
    classArray.push(classes.first);
    for (let i = 0; i < positions.length - 2; i++) {
      classArray.push(classes.middle);
    }
    classArray.push(classes.last);

    if (this[downwardsOrLeftwards](positions)) {
      classArray.reverse()
    }

    let railSegments = [];
    for (let i = 0; i < positions.length; i++) {
      railSegments.push(new classArray[i](this._scene, positions[i].x, positions[i].y))
    }

    return railSegments;
  }

  [downwardsOrLeftwards](positions) {
    let first = positions[0];
    let last = positions[positions.length - 1];
    return (first.x > last.x) || (first.y < last.y)
  }
}

export {
  RailSegment, RailSegmentFactory, WRailSegment, ERailSegment, WERailSegment,
  SRailSegment, NRailSegment, NSRailSegment, SERailSegment, NERailSegment, SWRailSegment, NWRailSegment
};
