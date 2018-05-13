/**
 * Created by Filip on 2018-05-08.
 */

class RailBuilder {
  constructor() {
    this.building = false;
    this.images = [];
    this.positions = [];
  }

  pointerDown(coordinates) {
    this.railBuildingStartX = coordinates.x;
    this.railBuildingStartY = coordinates.y;
    this.building = true
  }

  pointerUp() {
    if (this.building) {
      this.building = false;
    }
  }

  pointerMove(coordinates, scope) {
    if (this.building) {
      let gridName = "x" + coordinates.x + "y" + coordinates.y;
      if (!this.positions.includes(gridName)) {
        scope.add.image(coordinates.x, coordinates.y, 'halfrail');
      }
      //GRID[gridName] = {name: gridName};
      //this.add.image(x, y, 'halfrail');
    }
  }
}

export { RailBuilder };