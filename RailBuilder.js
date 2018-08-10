/**
 * Created by Filip on 2018-05-08.
 */
import {RailSegmentFactory} from "./RailSegment.js";
import {Image} from "./Image.js";
import {ActionController} from "./ActionController.js"

class RailBuilder extends ActionController{
  constructor(grid) {
    super(grid);
    this.invalidPositions = [];
  }

  /**
   * Called each time the pointer moves and returns the rail Image objects created
   * @param position an object with an x and y value representing the current location of the cursor
   * @returns {Array} an array of Image objects representing rail pieces.
   */
  oldpointerMove(position) {
    if (this.building) {
      let images = [];

      this.positions = this._positionsFromStartTo(position, this.grid.tileSize);
      if (this.positions.length < 2) {
        this.allowBuilding = false;
        return;
      }
      this.allowBuilding = true;
      this.buildingSegments = (new RailSegmentFactory()).fromPositionList(this.positions);
      for (let i = 0; i < this.buildingSegments.length; i++) {
        let position = this.positions[i];
        let tint = 0xFFFFFF;
        let existingBuilding = this.grid.get(position);
        if (this.buildingSegments[i].canBuildOn(existingBuilding)) {
          this.buildingSegments[i] = this.buildingSegments[i].combine(existingBuilding);
        } else {
          tint = 0xFF0000;
          this.allowBuilding = false;
        }
        images.push(new Image(position.x, position.y, this.buildingSegments[i].imageName,
          this.buildingSegments[i].angle, tint))
      }
      return images;
    }
  }

  _positionsToMarkInvalid() {
    // This depends on this.invalidPositions have been previously created.
    return this.invalidPositions;
  }

  _createBuildingSegments() {
    // TODO: is this instance variable needed?
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