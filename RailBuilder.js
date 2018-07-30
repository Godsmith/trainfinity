/**
 * Created by Filip on 2018-05-08.
 */
import {RailSegmentFactory} from "./RailSegment.js";
import {Image} from "./Image.js";
import {ActionController} from "./ActionController.js"

class RailBuilder extends ActionController{
  constructor(grid, tileSize) {
    super(grid, tileSize);
    this.positions = [];
    this.buildingSegments = [];
    this.allowBuilding = true;
  }

  /**
   * Called each time the pointer moves and returns the rail Image objects created
   * @param position an object with an x and y value representing the current location of the cursor
   * @returns {Array} an array of Image objects representing rail pieces.
   */
  pointerMove(position) {
    if (this.building) {
      let images = [];

      this.positions = this._positionsFromStartTo(position, this.tileSize);
      if (this.positions.length < 2) {
        this.allowBuilding = false;
        return;
      }
      this.allowBuilding = true;
      this.buildingSegments = (new RailSegmentFactory()).fromPositionList(this.positions);
      for (let i = 0; i < this.buildingSegments.length; i++) {
        let position = this.positions[i];
        let tint = 0xFFFFFF;
        let existingRailSegment = this.grid['x' + position.x + 'y' + position.y];
        if (this.buildingSegments[i].canBuildOn(existingRailSegment)) {
          this.buildingSegments[i] = this.buildingSegments[i].combine(existingRailSegment);
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

}

export {RailBuilder};