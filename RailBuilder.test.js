/**
 * Created by Filip on 2018-07-26.
 */
import {Grid}  from "./Grid.js";
import {RailBuilder} from "./RailBuilder.js";
import {ERailSegment, WRailSegment, NRailSegment, NSRailSegment, SRailSegment, SERailSegment,
  NWRailSegment, NERailSegment, SWRailSegment} from "./RailSegment.js";

test('Build horizontal rail with length 2', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(ERailSegment);
  expect(builder.grid.get({x: 32, y: 0})).toBeInstanceOf(WRailSegment);
});

test('Build horizontal rail with length 2 in the other direction', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 32, y: 0});
  builder.pointerMove({x: 0, y: 0});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(ERailSegment);
  expect(builder.grid.get({x: 32, y: 0})).toBeInstanceOf(WRailSegment);
});

test('Build vertical rail with length 3', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 64});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(SRailSegment);
  expect(builder.grid.get({x: 0, y: 32})).toBeInstanceOf(NSRailSegment);
  expect(builder.grid.get({x: 0, y: 64})).toBeInstanceOf(NRailSegment);
});

test('Build vertical rail with length 3 in the other direction', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 64});
  builder.pointerMove({x: 0, y: 0});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(SRailSegment);
  expect(builder.grid.get({x: 0, y: 32})).toBeInstanceOf(NSRailSegment);
  expect(builder.grid.get({x: 0, y: 64})).toBeInstanceOf(NRailSegment);
});

test('Clicking without moving to another square does nothing', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 0});
  builder.pointerUp();

  expect(builder.grid.count()).toEqual(0);
});

test('Moving the mouse without clicking does nothing', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerMove({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 32});

  expect(builder.grid.count()).toEqual(0);
});

test('Build circle', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 32});
  builder.pointerUp();
  builder.pointerDown({x: 0, y: 32});
  builder.pointerMove({x: 32, y: 32});
  builder.pointerUp();
  builder.pointerDown({x: 32, y: 32});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();
  builder.pointerDown({x: 32, y: 0});
  builder.pointerMove({x: 0, y: 0});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(SERailSegment);
  expect(builder.grid.get({x: 0, y: 32})).toBeInstanceOf(NERailSegment);
  expect(builder.grid.get({x: 32, y: 0})).toBeInstanceOf(SWRailSegment);
  expect(builder.grid.get({x: 32, y: 32})).toBeInstanceOf(NWRailSegment);
});

test('Invalid build (T-intersection)', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 64});
  builder.pointerUp();

  builder.pointerDown({x: 0, y: 32});
  builder.pointerMove({x: 32, y: 32});
  builder.pointerUp();

  expect(builder.grid.count()).toEqual(3);
});
