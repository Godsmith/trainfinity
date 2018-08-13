/**
 * Controller for placing trains
 *
 * Can only place trains on rail.
 * Does not write to the grid.
 *
 * Created by Filip on 2018-08-10.
 */

import {ActionController} from "./ActionController.js"

class Train {
  constructor() {
    this.imageName = 'train';
    // TODO: should not always be 0 here
    this.angle = 0;
  }
}

class TrainBuilder extends ActionController {
  constructor(grid) {
    super(grid);
  }

  _positionsToMarkInvalid() {
    return this.positions.filter((x) => !this.grid.hasRail(x));
  }

  _createBuildingSegments() {
    this.buildingSegments = this.positions.map(() => new Train());
  }

  _writeToGrid(position, building) {
  }
}

export {TrainBuilder};