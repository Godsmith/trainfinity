/**
 * Created by Filip on 2018-07-28.
 */
import {Grid}  from "./Grid.js";
import {StationBuilder, Station} from "./StationBuilder.js";
import {NSRailSegment, WERailSegment} from "./RailSegment.js"

test('Build horizontal station with length 2 adjacent to rail', () => {
  let grid = new Grid();
  grid.set({x:0, y: 32}, new NSRailSegment());
  grid.set({x:32, y: 32}, new NSRailSegment());
  let builder = new StationBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(Station);
  expect(builder.grid.get({x: 32, y: 0})).toBeInstanceOf(Station);
});

describe('PositionsToMarkInvalid', () => {
  test('Any position with an existing building is marked red', () => {
    let grid = new Grid();
    grid.set({x:0, y: 0}, new Station());
    grid.set({x:0, y: 32}, new NSRailSegment());
    let builder = new StationBuilder(grid);

    expect(builder._positionsToMarkInvalid([{x: 0, y: 0}, {x: 0, y: 32}])).toEqual([{x: 0, y: 0}, {x: 0, y: 32}]);
  });
  test('If the position does not have any adjacent rail, mark the building red', () => {
    let grid = new Grid();
    let builder = new StationBuilder(grid);

    expect(builder._positionsToMarkInvalid([{x: 0, y: 0}, {x: 0, y: 32}])).toEqual([{x: 0, y: 0}, {x: 0, y: 32}]);
  });
  test('Mark red if station adjacent', () => {
    let grid = new Grid();
    grid.set({x:0, y: 0}, new Station());
    grid.set({x:32, y: 0}, new Station());
    grid.set({x:0, y: 64}, new WERailSegment());
    grid.set({x:32, y: 64}, new WERailSegment());
    let builder = new StationBuilder(grid);

    expect(builder._positionsToMarkInvalid([{x: 0, y: 32}, {x: 32, y: 32}])).toEqual([{x: 0, y: 32}, {x: 32, y: 32}]);
  });
});

