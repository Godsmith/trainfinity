/**
 * Controller for placing trains
 *
 * Can only place trains on rail.
 * Does not write to the grid.
 *
 * Created by Filip on 2018-08-10.
 */

import {ActionController} from "./ActionController.js"
import {Locomotive} from "./Locomotive.js"

class TrainBuilder extends ActionController {
  constructor(grid, physicsGroup, scene) {
    super(grid, physicsGroup, scene);
  }

  _positionsToMarkInvalid() {
    return this.positions.filter((x) => !this.grid.hasRail(x));
  }

  _createGameObjects() {
    this.gameObjects = this.positions.map(position => new Locomotive(this._scene, this.grid,
      position.x, position.y, this._direction()));
  }

  _writeToGrid(position, building) {
  }

  _direction() {
    let firstPosition = this.positions[0];
    let lastPosition = this.positions[this.positions.length - 1];
    if (firstPosition.x == lastPosition.x) {
      return firstPosition.y < lastPosition.y ? 'N' : 'S';
    } else {
      return firstPosition.x < lastPosition.x ? 'W' : 'E';
    }
  }
}

export {TrainBuilder};