/**
 * Created by Filip on 2018-05-20.
 */

const downwardsOrLeftwards = Symbol('downwardsOrLeftwards');

class RailSegment {
  constructor() {
    this.imageName = 'RailSegment image name';
    this.angle = 0;
  }
}

class NRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 0;
  }
}
class ERailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 90;
  }
}
class SRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 180;
  }
}
class WRailSegment extends RailSegment {
  constructor() {
    super();
    this.imageName = 'halfrail';
    this.angle = 270;
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

class RailSegmentFactory {

  fromCoordinateList(coordinateList) {
    let horizontal = (coordinateList[0].y === coordinateList[coordinateList.length - 1].y);
    let railSegments = [];
    if (horizontal) {
      railSegments.push(new ERailSegment());
      for (let i = 0; i < coordinateList.length - 2; i++) {
        railSegments.push(new WERailSegment());
      }
      railSegments.push(new WRailSegment())
    } else {
      railSegments.push(new NRailSegment());
      for (let i = 0; i < coordinateList.length - 2; i++) {
        railSegments.push(new NSRailSegment());
      }
      railSegments.push(new SRailSegment())
    }
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
