/**
 * Created by Filip on 2018-07-28.
 */

import {Image} from "./Image.js";

class ActionController {
  constructor(grid) {
    this.grid = grid;
    this.building = false;
    this.buildingSegments = [];
    this.positions = [];
    this.allowBuilding = true;
    this.startX = null;
    this.startY = null;
  }

  pointerDown(position) {
    this.startX = position.x;
    this.startY = position.y;
    this.building = true
  }

  /**
   * Called each time the pointer moves and returns the rail Image objects created
   * @param position an object with an x and y value representing the current location of the cursor
   * @returns {Array} an array of Image objects representing rail pieces.
   */
  pointerMove(position) {
    if (!this.building) {
      return [];
    }
    this.positions = this._positionsFromStartTo(position, this.grid.tileSize);
    if (this.positions.length < 2) {
      this.allowBuilding = false;
      return [];
    }

    let images = [];
    this.allowBuilding = true;
    this._createBuildingSegments();
    for (let i = 0; i < this.buildingSegments.length; i++) {
      let position = this.positions[i];
      images.push(new Image(position.x, position.y, this.buildingSegments[i].imageName,
        this.buildingSegments[i].angle, 0xFFFFFF))
    }
    for (let position of this._positionsToMarkInvalid(this.positions)) {
      images.push(new Image(position.x, position.y, 'red', 0, 0xFFFFFF));
      this.allowBuilding = false;
    }
    return images;
  }

  /**
   * Create and store this.buildingSegments which are the objects that will be created
   * by the controller
   * @private
   */
  /* istanbul ignore next */
  _createBuildingSegments() {
    throw new Error('Not implemented');
  }

  /**
   * Return a list of Positions that we currently try to build on that cannot be built on
   * These will be marked red.
   * @returns {Array}
   * @private
   */
  /* istanbul ignore next */
  _positionsToMarkInvalid() {
    throw new Error('Not implemented');
  }

  /**
   * Called when the mouse pointer is released.
   * Updates the internal grid with the new building segments
   * @returns {boolean} true if something has been built, false otherwise
   */
  pointerUp() {
    this.building = false;
    if (this.allowBuilding) {
      for (let i = 0; i < this.positions.length; i++) {
        let position = this.positions[i];
        this.grid.set(position, this.buildingSegments[i])
      }
      return true;
    }
    return false;
  }

  _positionsFromStartTo(position, tilesize) {
    let positions = [];
    if (position.y === this.startY) {
      if (position.x === this.startX) {
        return [position];
      }
      let step = position.x > this.startX ? tilesize : -tilesize;
      for (let x = this.startX; x != position.x; x += step) {
        positions.push({x: x, y: this.startY})
      }
      // The for loop stops before adding the final position, so add it here
      positions.push({x: position.x, y: position.y});
    }
    if (position.x === this.startX) {
      let step = position.y > this.startY ? tilesize : -tilesize;
      for (let y = this.startY; y != position.y; y += step) {
        positions.push({x: this.startX, y: y})
      }
      // The for loop stops before adding the final position, so add it here
      positions.push({x: position.x, y: position.y});
    }
    return positions;
  }

}

export {ActionController};
