/**
 * Created by Filip on 2018-08-13.
 */

import {Grid}  from "./Grid.js";
import {TrainBuilder} from "./TrainBuilder.js";
import {NSRailSegment, RailSegment} from "./RailSegment.js"


test('After train is built on rail, the rail persists', () => {
  let grid = new Grid();
  grid.set({x: 0, y: 0}, new NSRailSegment());
  grid.set({x: 0, y: 32}, new NSRailSegment());
  let builder = new TrainBuilder(grid, null, mockedScene);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 32});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(RailSegment);
  expect(builder.grid.get({x: 0, y: 32})).toBeInstanceOf(RailSegment);
});

describe('The direction of the train', () => {
  let grid = new Grid();
  grid.set({x: 0, y: 0}, new NSRailSegment());
  grid.set({x: 0, y: 32}, new NSRailSegment());
  let builder = new TrainBuilder(grid, null, mockedScene);

  test('is north when dragging downwards', () => {

    builder.pointerDown({x: 0, y: 0});
    let gameObjects = builder.pointerMove({x: 0, y: 32});

    expect(gameObjects[0].direction).toEqual('N');
  });

  test('is south when dragging upwards', () => {
    let grid = new Grid();
    grid.set({x: 0, y: 0}, new NSRailSegment());
    grid.set({x: 0, y: 32}, new NSRailSegment());
    let builder = new TrainBuilder(grid, null, mockedScene);

    builder.pointerDown({x: 0, y: 32});
    let gameObjects = builder.pointerMove({x: 0, y: 0});

    expect(gameObjects[0].direction).toEqual('S');
  });

  test('is west when dragging to the right', () => {
    let grid = new Grid();
    grid.set({x: 0, y: 0}, new NSRailSegment());
    grid.set({x: 32, y: 0}, new NSRailSegment());
    let builder = new TrainBuilder(grid, null, mockedScene);

    builder.pointerDown({x: 0, y: 0});
    let gameObjects = builder.pointerMove({x: 32, y: 0});

    expect(gameObjects[0].direction).toEqual('W');
  });

  test('is east when dragging to the left', () => {
    let grid = new Grid();
    grid.set({x: 0, y: 0}, new NSRailSegment());
    grid.set({x: 32, y: 0}, new NSRailSegment());
    let builder = new TrainBuilder(grid, null, mockedScene);

    builder.pointerDown({x: 32, y: 0});
    let gameObjects = builder.pointerMove({x: 0, y: 0});

    expect(gameObjects[0].direction).toEqual('E');
  });
});