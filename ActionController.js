/**
 * Created by Filip on 2018-07-28.
 */

import {Image} from "./Image.js";
import {TILESIZE} from "./world/constants.js"

class ActionController {
  /**
   * Creates a new instance of this class
   * @param grid Stores rails and buildings for easy access
   * @param physicsGroup Where the GameObjects will be created
   * @param scene Needed for creating GameObjects
   */
  constructor(grid, physicsGroup, scene) {
    this._scene = scene;
    this.grid = grid;
    this.physicsGroup = physicsGroup;
    this.building = false;
    this.gameObjects = [];
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
   * @returns {Array} an array of GameObjects that will be placed in the scene.
   */
  pointerMove(position) {
    if (!this.building) {
      return [];
    }
    this.positions = this._positionsFromStartTo(position, TILESIZE);
    if (this.positions.length < 2) {
      this.allowBuilding = false;
      return [];
    }

    this.allowBuilding = true;
    this._createGameObjects();
    let images = this.gameObjects;
    for (let position of this._positionsToMarkInvalid(this.positions)) {
      images.push(new Image(this._scene, position.x, position.y, 'red'));
      this.allowBuilding = false;
    }
    return images;
  }

  /**
   * Create and store this.gameObjects which are the objects that will be created
   * by the controller
   * @private
   */
  /* istanbul ignore next */
  _createGameObjects() {
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
        this._writeToGrid(position, this.gameObjects[i])
      }
      return true;
    }
    return false;
  }

  /**
   * Called in pointerUp
   * @param position the grid position to write to
   * @param building what to write to that position
   * @private
   */
  _writeToGrid(position, building) {
    this.grid.set(position, building)
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
