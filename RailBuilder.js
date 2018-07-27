/**
 * Created by Filip on 2018-05-08.
 */
import {RailSegmentFactory} from "./RailSegment.js";
import {Image} from "./Image.js";

const listCoordinatesFromStartTo = Symbol('listCoordinatesFromStartTo');

class RailBuilder {
  constructor(grid, tileSize) {
    this.grid = grid;
    this.tileSize = tileSize;
    this.building = false;
    this.coordinateList = [];
    this.railSegments = [];
    this.allowBuilding = true;
  }

  pointerDown(coordinates) {
    this.startX = coordinates.x;
    this.startY = coordinates.y;
    this.building = true
  }

  /**
   * Called when the mouse pointer is released.
   * Updates the internal grid with the new rail segments
   * @returns {boolean} true if rail has been built, false otherwise
   */
  pointerUp() {
    // TODO: rename to buildingAllowed or something. But has side effects, so perhaps not.
    if (this.building) {
      this.building = false;
      if (this.allowBuilding) {
        for (let i = 0; i < this.coordinateList.length; i++) {
          let coordinate = this.coordinateList[i];
          this.grid['x' + coordinate.x + 'y' + coordinate.y] = this.railSegments[i]
        }
        return true;
      }
    }
    return false;
  }

  [listCoordinatesFromStartTo](coordinate, tilesize) {
    let coordinates = [];
    if (coordinate.y === this.startY) {
      if (coordinate.x === this.startX) {
        return [coordinate];
      }
      let step = coordinate.x > this.startX ? tilesize : -tilesize;
      for (let x = this.startX; x != coordinate.x; x += step) {
        coordinates.push({x: x, y: this.startY})
      }
      // The for loop stops before adding the final coordinate, so add it here
      coordinates.push({x: coordinate.x, y: coordinate.y});
    }
    if (coordinate.x === this.startX) {
      let step = coordinate.y > this.startY ? tilesize : -tilesize;
      for (let y = this.startY; y != coordinate.y; y += step) {
        coordinates.push({x: this.startX, y: y})
      }
      // The for loop stops before adding the final coordinate, so add it here
      coordinates.push({x: coordinate.x, y: coordinate.y});
    }
    return coordinates;
  }

  /**
   * Called each time the pointer moves and returns the rail Image objects created
   * @param coordinates an object with an x and y value representing the current location of the cursor
   * @returns {Array} an array of Image objects representing rail pieces.
   */
  pointerMove(coordinates) {
    if (this.building) {
      let images = [];

      this.coordinateList = this[listCoordinatesFromStartTo](coordinates, this.tileSize);
      if (this.coordinateList.length < 2) {
        this.allowBuilding = false;
        return;
      }
      this.allowBuilding = true;
      this.railSegments = (new RailSegmentFactory()).fromCoordinateList(this.coordinateList);
      for (let i = 0; i < this.railSegments.length; i++) {
        let coordinate = this.coordinateList[i];
        let tint = 0xFFFFFF;
        let existingRailSegment = this.grid['x' + coordinate.x + 'y' + coordinate.y];
        if (this.railSegments[i].canBuildOn(existingRailSegment)) {
          this.railSegments[i] = this.railSegments[i].combine(existingRailSegment);
        } else {
          tint = existingRailSegment ? 0xFF0000 : 0xFFFFFF;
          this.allowBuilding = false;
        }
        images.push(new Image(coordinate.x, coordinate.y, this.railSegments[i].imageName,
          this.railSegments[i].angle, tint))
      }
      return images;
    }
  }

}

export {RailBuilder};