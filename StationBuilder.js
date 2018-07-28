/**
 * Created by Filip on 2018-07-28.
 */

import {Image} from "./Image.js";
import {ActionController} from "./ActionController.js"

class StationBuilder extends ActionController {
  constructor(grid, tileSize) {
    super(grid, tileSize);
  }

  /**
   * Called each time the pointer moves and returns the rail Image objects created
   * @param coordinates an object with an x and y value representing the current location of the cursor
   * @returns {Array} an array of Image objects representing rail pieces.
   */
  pointerMove(coordinates) {
    if (this.building) {
      let images = [];

      this.coordinateList = this._listCoordinatesFromStartTo(coordinates, this.tileSize);
      this.allowBuilding = true;
      this.buildingSegments = this.coordinateList.map(() => new Station());
      for (let i = 0; i < this.buildingSegments.length; i++) {
        let coordinate = this.coordinateList[i];
        let tint = 0xFFFFFF;
        let existingBuilding = this.grid['x' + coordinate.x + 'y' + coordinate.y];
        if (existingBuilding) {
          tint = 0xFF0000;
          this.allowBuilding = false;
        }
        images.push(new Image(coordinate.x, coordinate.y, 'station', 0, tint))
      }
      return images;
    }
  }
}

class Station {
  constructor() {
  }
}

export {StationBuilder, Station};
