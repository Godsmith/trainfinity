/**
 * Created by Filip on 2018-07-28.
 */

import {ActionController} from "./ActionController.js"

class Station extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'station', frame);
  }
}

class StationBuilder extends ActionController {
  constructor(grid, physicsGroup, scene) {
    super(grid, physicsGroup, scene);
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

  _createGameObjects() {
    this.gameObjects = this.positions.map(position => new Station(this._scene, position.x, position.y));
  }
}


export {StationBuilder, Station};
