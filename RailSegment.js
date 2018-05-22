/**
 * Created by Filip on 2018-05-20.
 */

const downwardsOrLeftwards = Symbol('downwardsOrLeftwards');

class RailSegment {
  constructor() {
    this.imageName = 'RailSegment image name';
    this.angle = 0;
    this.possibleCombinations = {};
  }

  canBuildOn(railSegment) {
    if (!railSegment) {
      return true;
    }
    console.log(this.constructor.name + " can build on " + railSegment.constructor.name + ": " + (railSegment.constructor.name in this.possibleCombinations).toString());
    return railSegment.constructor.name in this.possibleCombinations;
  }

  combine(railSegment) {
    if (!railSegment) {
      return this;
    }
    let railSegmentClass = this.possibleCombinations[railSegment.constructor.name];
    return new railSegmentClass;
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
    }
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
    }
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
    }
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
    }
  }
}

class NSRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'rail';
    this.angle = 0;
  }
}

class WERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'rail';
    this.angle = 90;
  }
}

class NERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 0;
  }
}

class SERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 90;
  }
}

class SWRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 180;
  }
}

class NWRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'railturn';
    this.angle = 270;
  }
}

class RailSegmentFactory {

  fromCoordinateList(coordinateList) {
    let horizontal = (coordinateList[0].y === coordinateList[coordinateList.length - 1].y);
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
    for (let i = 0; i < coordinateList.length - 2; i++) {
      railSegments.push(new classes.middle());
    }
    railSegments.push(new classes.last());

    if (this[downwardsOrLeftwards](coordinateList)) {
      railSegments.reverse()
    }

    return railSegments;
  }

  [downwardsOrLeftwards](coordinateList) {
    if (coordinateList.length < 2) {
      return false;
    }
    let first = coordinateList[0];
    let last = coordinateList[coordinateList.length - 1];
    return (first.x > last.x) || (first.y < last.y)
  }
}

export {RailSegmentFactory};
