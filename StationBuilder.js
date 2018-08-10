/**
 * Created by Filip on 2018-07-28.
 */

import {ActionController} from "./ActionController.js"

class Station {
  constructor() {
    this.imageName = 'station';
    this.angle = 0;
  }
}

class StationBuilder extends ActionController {
  constructor(grid) {
    super(grid);
  }

  _positionsToMarkInvalid() {
    let invalidPositions = [];
    for (let position of this.positions) {
      if (this.grid.hasBuilding(position)) {
        invalidPositions.push(position);
      }
      if (!this.grid.isRailAdjacent(position)) {
        invalidPositions.push(position);
      }
      if (this.grid.isStationAdjacent(position)) {
        invalidPositions.push(position);
      }
    }
    // Make the positions unique
    return Array.from(new Set(invalidPositions));
  }

  _createBuildingSegments() {
    this.buildingSegments = this.positions.map(() => new Station());
  }
}


export {StationBuilder, Station};
