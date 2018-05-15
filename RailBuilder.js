/**
 * Created by Filip on 2018-05-08.
 */

const listCoordinatesFromStartTo = Symbol('listCoordinatesFromStartTo');

class RailBuilder {
  constructor() {
    this.building = false;
    this.images = [];
    this.positions = [];
  }

  pointerDown(coordinates) {
    this.startX = coordinates.x;
    this.startY = coordinates.y;
    this.building = true
  }

  pointerUp() {
    if (this.building) {
      this.building = false;
      this.images = [];
    }
  }

  [listCoordinatesFromStartTo] (coordinate, tilesize) {
    let coordinates = [];
    if (coordinate.y === this.startY) {
      let step = coordinate.x > this.startX ? tilesize : -tilesize;
      for (let x = this.startX; x != coordinate.x; x += step) {
        coordinates.push({x: x, y: this.startY})
      }
      // The for loop stops before adding the final coordinate, so add it here
      coordinates.push({x: coordinate.x, y: coordinate.y});
    }
    return coordinates;
  }

  pointerMove(coordinates, game, TILESIZE) {
    if (this.building) {
      for (var image of this.images) {
        image.destroy()
      }
      this.images = [];
      for (var coordinate of this[listCoordinatesFromStartTo](coordinates, TILESIZE)) {
        let image = game.add.image(coordinate.x, coordinate.y, 'halfrail');
        this.images.push(image)
      }
      // let gridName = "x" + coordinates.x + "y" + coordinates.y;
      // if (!this.positions.includes(gridName)) {
      //   let image = game.add.image(coordinates.x, coordinates.y, 'halfrail');
      //   this.images.push(image)
      // }
      //GRID[gridName] = {name: gridName};
      //this.add.image(x, y, 'halfrail');
    }
  }
}

export {RailBuilder};