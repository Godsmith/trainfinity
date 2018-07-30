/**
 * Created by Filip on 2018-07-28.
 */

class ActionController {
  constructor(grid) {
    this.grid = grid;
    this.building = false;
  }

  pointerDown(position) {
    this.startX = position.x;
    this.startY = position.y;
    this.building = true
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
