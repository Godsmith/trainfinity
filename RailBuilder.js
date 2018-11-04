/**
 * Created by Filip on 2018-05-08.
 */
import {RailSegmentFactory} from "./RailSegment.js";
import {Image} from "./Image.js";
import {ActionController} from "./ActionController.js"

class RailBuilder extends ActionController{
  constructor(grid, physicsGroup) {
    super(grid, physicsGroup);
    this.invalidPositions = [];
  }

  _positionsToMarkInvalid() {
    // This depends on this.invalidPositions have been previously created.
    return this.invalidPositions;
  }

  _createBuildingSegments() {
    this.invalidPositions = [];
    this.buildingSegments = (new RailSegmentFactory()).fromPositionList(this.positions);
    for (let i = 0; i < this.buildingSegments.length; i++) {
      let position = this.positions[i];
      let existingBuilding = this.grid.get(position);
      if (this.buildingSegments[i].canBuildOn(existingBuilding)) {
        this.buildingSegments[i] = this.buildingSegments[i].combine(existingBuilding);
      } else {
        this.invalidPositions.push(position);
      }
    }
  }

}

export {RailBuilder};