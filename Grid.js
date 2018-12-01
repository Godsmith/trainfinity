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
    //this._buildings['x' + position.x + 'y' + position.y] = building
    for (let dx = 0; dx < building.width; dx += this.tileSize) {
       for (let dy = 0; dy < building.height; dy += this.tileSize) {
         this._buildings['x' + (position.x + dx) + 'y' + (position.y + dy)] = building
       }
    }
  }

  get(position) {
    // TODO: throw or return null object if there is no building at position
    return this._buildings['x' + position.x + 'y' + position.y]
  }

  getPositionClosestTo(x, y) {
    let roundToNearestTile = x => this.tileSize * Math.round(x/this.tileSize);
    let roundedX = roundToNearestTile(x);
    let roundedY = roundToNearestTile(y);
    return {x: roundedX, y: roundedY};
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

  /**
   * Starting with the selected rail, walk around and find all
   * positions that are connected
   *
   * @param position the starting position
   * @param positions collected so far (for recursion)
   * @returns an array with all connected positions
   * @private
   */
  _connectedRailPositions(position, positions=[]) {
    if (this._isPositionInArray(position, positions)) {
      return;
    }
    if (!this.hasRail(position)) {
      return;
    }
    positions.push(position);
    let rail = this.get(position);
    for (let delta_position of rail.connectedAdjacentPositions(position)) {
      let new_position = this._position_plus_delta(position, delta_position);
      this._connectedRailPositions(new_position, positions)
    }
    return positions
  }

  _isPositionInArray(position, array) {
    for (let new_position of array) {
      if (position.x == new_position.x && position.y == new_position.y) {
        return true;
      }
    }
    return false;
  }

  /**
   * Add a position to a delta position
   *
   * @param position a position, such as {x: 32, y: 64}
   * @param delta_position a delta in position, such as {x: 1, y: 0}. Expressed in number of tiles.
   * @private
   */
  _position_plus_delta(position, delta_position) {
    return {
      x: position.x + delta_position.x * this.tileSize,
      y: position.y + delta_position.y * this.tileSize
    }
  }

  /**
   * Return an array of points corresponding to the path from one rail position
   * @param position
   * @return an array [x1, y1, x2, y2, ...] that specifies the points
   */
  curve(position) {
    let array = [];
    for (let p of this._connectedRailPositions(position)) {
      array.push(p.x);
      array.push(p.y);
    }
    return array;
  }
}

export {Grid};
