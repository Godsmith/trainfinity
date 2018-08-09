/**
 * Created by Filip on 2018-07-30.
 */

import {RailSegment} from "./RailSegment.js"
import {Station} from "./StationBuilder.js"

class Grid {
  constructor(tileSize = 32) {
    this.tileSize = tileSize;
    this._buildings = {};
  }

  /**
   * Get the adjacent positions of a position
   * @param position
   * @return {Set} all adjacent positions (north, south, west, east)
   */
  adjacent(position) {
    return [
      {x: position.x, y: position.y - this.tileSize},
      {x: position.x, y: position.y + this.tileSize},
      {x: position.x - this.tileSize, y: position.y},
      {x: position.x + this.tileSize, y: position.y},
    ];
  }

  isRailAdjacent(position) {
    return this.adjacent(position).some(this.hasRail.bind(this));
  }

  isStationAdjacent(position) {
    return this.adjacent(position).some(this.hasStation.bind(this));
  }

  set(position, building) {
    this._buildings['x' + position.x + 'y' + position.y] = building
  }

  get(position) {
    return this._buildings['x' + position.x + 'y' + position.y]
  }

  hasBuilding(position) {
    return !!this.get(position);
  }

  hasRail(position) {
    return this.get(position) instanceof RailSegment;
  }

  hasStation(position) {
    return this.get(position) instanceof Station;
  }

  count() {
    return Object.keys(this._buildings).length;
  }
}

export {Grid};
