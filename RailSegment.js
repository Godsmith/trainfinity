/**
 * Created by Filip on 2018-05-20.
 */

const downwardsOrLeftwards = Symbol('downwardsOrLeftwards');

class RailSegment {
  constructor() {
    this.imageName = 'RailSegment image name';
    this.angle = 0;
    this.possibleCombinations = {};
    this.stationAllowed = {N: false, E: false, S: false, W: false};
    this._connectedAdjacentPositionDeltas = [];
  }

  canBuildOn(railSegment) {
    if (railSegment) {
      return railSegment.constructor.name in this.possibleCombinations;
    } else {
      return true;
    }
  }

  combine(railSegment) {
    if (!railSegment) {
      return this;
    }
    let railSegmentClass = this.possibleCombinations[railSegment.constructor.name];
    return new railSegmentClass;
  }

  /**
   * Return the connected positions, where 1 point is 1 tile.
   *
   * @return an array of position modifications, e.g. [{x: -1, y: 0}, {x: 1: y: 0}]
   */
  connectedAdjacentPositions() {
    return this._connectedAdjacentPositionDeltas;
  }
}

class NRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 0;
    this.possibleCombinations = {
      ERailSegment: NERailSegment,
      WRailSegment: NWRailSegment,
      SRailSegment: NSRailSegment
    };
    this.stationAllowed['E'] = this.stationAllowed['W'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}];
  }
}
class ERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 90;
    this.possibleCombinations = {
      NRailSegment: NERailSegment,
      SRailSegment: SERailSegment,
      WRailSegment: WERailSegment
    };
    this.stationAllowed['N'] = this.stationAllowed['S'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 1, y: 0}];
  }
}
class SRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 180;
    this.possibleCombinations = {
      ERailSegment: SERailSegment,
      WRailSegment: SWRailSegment,
      NRailSegment: NSRailSegment
    };
    this.stationAllowed['E'] = this.stationAllowed['W'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: 1}];
  }
}
class WRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 270;
    this.possibleCombinations = {
      NRailSegment: NWRailSegment,
      SRailSegment: SWRailSegment,
      ERailSegment: WERailSegment
    };
    this.stationAllowed['N'] = this.stationAllowed['S'] = true;
    this._connectedAdjacentPositionDeltas = [{x: -1, y: 0}];
  }
}

class NSRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'rail';
    this.angle = 0;
    this.stationAllowed['E'] = this.stationAllowed['W'] = true;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}, {x: 0, y: 1}];
  }
}

class WERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'rail';
    this.angle = 90;
    this.stationAllowed['N'] = this.stationAllowed['S'] = true;
    this._connectedAdjacentPositionDeltas = [{x: -1, y: 0}, {x: 1, y: 0}];
  }
}

class NERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 0;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}, {x: 1, y: 0}];
  }
}

class SERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 90;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: 1}, {x: 1, y: 0}];
  }
}

class SWRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 180;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: 1}, {x: -1, y: 0}];
  }
}

class NWRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 270;
    this._connectedAdjacentPositionDeltas = [{x: 0, y: -1}, {x: -1, y: 0}];
  }
}

class RailSegmentFactory {

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

    let railSegments = [];
    railSegments.push(new classes.first());
    for (let i = 0; i < positions.length - 2; i++) {
      railSegments.push(new classes.middle());
    }
    railSegments.push(new classes.last());

    if (this[downwardsOrLeftwards](positions)) {
      railSegments.reverse()
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
