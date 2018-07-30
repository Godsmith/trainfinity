/**
 * Created by Filip on 2018-07-28.
 */

import {Image} from "./Image.js";
import {ActionController} from "./ActionController.js"

class StationBuilder extends ActionController {
  constructor(grid) {
    super(grid);
  }

  /**
   * Called each time the pointer moves and returns the rail Image objects created
   * @param position an object with an x and y value representing the current location of the cursor
   * @returns {Array} an array of Image objects representing rail pieces.
   */
  pointerMove(position) {
    if (this.building) {
      let images = [];

      this.positions = this._positionsFromStartTo(position, this.grid.tileSize);
      this.allowBuilding = true;
      this.buildingSegments = this.positions.map(() => new Station());
      for (let i = 0; i < this.buildingSegments.length; i++) {
        let position = this.positions[i];
        let tint = 0xFFFFFF;
        let existingBuilding = this.grid['x' + position.x + 'y' + position.y];
        if (existingBuilding) {
          tint = 0xFF0000;
          this.allowBuilding = false;
        }
        images.push(new Image(position.x, position.y, 'station', 0, tint))
      }
      return images;
    }
  }

  _positionsToMarkInvalid(newStationPositions) {
    let invalidPositions = [];
    for (let position of newStationPositions) {
      if (this.grid.hasBuilding(position)) {
        invalidPositions.push(position);
      }
    }
    console.log(this.grid);
    return invalidPositions;
  }
}

class _StationPlacementAnswer {
  constructor () {
    this.positionsToMarkRed = [];
  }
}

class Station {
  constructor() {
  }
}

export {StationBuilder, Station};
