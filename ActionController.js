/**
 * Created by Filip on 2018-07-28.
 */

class ActionController {
  constructor(grid, tileSize) {
    this.grid = grid;
    this.tileSize = tileSize;
    this.building = false;
  }

  pointerDown(coordinates) {
    this.startX = coordinates.x;
    this.startY = coordinates.y;
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
      for (let i = 0; i < this.coordinateList.length; i++) {
        let coordinate = this.coordinateList[i];
        this.grid['x' + coordinate.x + 'y' + coordinate.y] = this.buildingSegments[i]
      }
      return true;
    }
    return false;
  }

  _listCoordinatesFromStartTo(coordinate, tilesize) {
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

}

export {ActionController};
