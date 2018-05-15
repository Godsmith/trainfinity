/**
 * Created by Filip on 2018-05-08.
 */

const listCoordinatesFromStartTo = Symbol('listCoordinatesFromStartTo');
const downwardsOrLeftwards = Symbol('downwardsOrLeftwards');

class RailBuilder {
  constructor(grid) {
    this.grid = grid;
    this.building = false;
    this.images = [];
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

  pointerMove(coordinates, game, TILESIZE) {
    let horizontal = (coordinates.y === this.startY);
    if (this.building) {
      for (var image of this.images) {
        image.destroy()
      }
      this.images = [];
      this.coordinateList = this[listCoordinatesFromStartTo](coordinates, TILESIZE);
      if (this.coordinateList.length < 2) {
        return;
      }
      for (var coordinate of this.coordinateList) {
        let imageFileName = 'halfrail';
        let angle = horizontal ? 90 : 0;
        if (this[downwardsOrLeftwards](this.coordinateList)) {
          angle += 180;
        }
        if (coordinate === this.coordinateList[0]) {
          // Do nothing
        } else if (coordinate === this.coordinateList[this.coordinateList.length - 1]) {
          angle += 180
        } else {
          imageFileName = 'rail';
        }
        let image = game.add.image(coordinate.x, coordinate.y, imageFileName);
        image.angle = angle;
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

  [downwardsOrLeftwards] (coordinateList) {
    if (coordinateList.length < 2) {
      return false;
    }
    let first = coordinateList[0];
    let last = coordinateList[coordinateList.length - 1];
    return (first.x > last.x) || (first.y < last.y)
  }
}

export {RailBuilder};