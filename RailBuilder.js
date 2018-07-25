/**
 * Created by Filip on 2018-05-08.
 */
import {RailSegmentFactory} from "./RailSegment.js";

const listCoordinatesFromStartTo = Symbol('listCoordinatesFromStartTo');

class RailBuilder {
  constructor(grid) {
    this.grid = grid;
    this.building = false;
    this.images = [];
    this.coordinateList = [];
    this.railSegments = [];
    this.allowBuilding = true;
  }

  pointerDown(coordinates) {
    this.startX = coordinates.x;
    this.startY = coordinates.y;
    this.building = true
  }

  pointerUp() {
    if (this.building) {
      this.building = false;
      if (this.allowBuilding) {
        for (let i = 0; i < this.coordinateList.length; i++) {
          let coordinate = this.coordinateList[i];
          this.grid['x' + coordinate.x + 'y' + coordinate.y] = this.railSegments[i]
        }
      } else {
        for (var image of this.images) {
          image.destroy()
        }
      }
      this.images = [];
      console.log(this.grid)
    }
  }

  [listCoordinatesFromStartTo](coordinate, tilesize) {
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
    if (this.building) {
      for (var image of this.images) {
        image.destroy()
      }
      this.images = [];

      this.coordinateList = this[listCoordinatesFromStartTo](coordinates, TILESIZE);
      if (this.coordinateList.length < 2) {
        this.allowBuilding = false;
        return;
      }
      this.allowBuilding = true;
      this.railSegments = (new RailSegmentFactory()).fromCoordinateList(this.coordinateList);
      for (let i = 0; i < this.railSegments.length; i++) {
        let coordinate = this.coordinateList[i];
        let tint = 0xFFFFFF;
        let existingRailSegment = this.grid['x' + coordinate.x + 'y' + coordinate.y];
        if (this.railSegments[i].canBuildOn(existingRailSegment)) {
          this.railSegments[i] = this.railSegments[i].combine(existingRailSegment);
        } else {
          tint = existingRailSegment ? 0xFF0000 : 0xFFFFFF;
          this.allowBuilding = false;
        }
        let image = game.add.image(coordinate.x, coordinate.y, this.railSegments[i].imageName);
        image.angle = this.railSegments[i].angle;
        image.tint = tint;
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