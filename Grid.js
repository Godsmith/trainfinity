/**
 * Created by Filip on 2018-07-30.
 */

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
    return new Set([
      {x: position.x, y: position.y - this.tileSize},
      {x: position.x, y: position.y + this.tileSize},
      {x: position.x - this.tileSize, y: position.y},
      {x: position.x + this.tileSize, y: position.y},
    ])
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

  count() {
    return Object.keys(this._buildings).length;
  }
}

export {Grid};
