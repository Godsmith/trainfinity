/**
 * Created by Filip on 2018-07-26.
 */
import {Grid}  from "./Grid.js";
import {RailBuilder} from "./RailBuilder.js";
import {Water} from "./world/Water.js";


test('Build horizontal rail with length 2', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();

  expect(grid.hasRail({x: 0, y: 0}));
  expect(grid.hasRail({x: 32, y: 0}));
  expect(grid.get({x: 0, y: 0}).directions).toEqual(new Set(['E']));
  expect(grid.get({x: 32, y: 0}).directions).toEqual(new Set(['W']));
});

test('Build horizontal rail with length 2 in the other direction', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();

  expect(grid.get({x: 0, y: 0}).directions).toEqual(new Set(['E']));
  expect(grid.get({x: 32, y: 0}).directions).toEqual(new Set(['W']));
});

test('Build vertical rail with length 3', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 64});
  builder.pointerUp();

  expect(grid.get({x: 0, y: 0}).directions).toEqual(new Set(['S']));
  expect(grid.get({x: 0, y: 32}).directions).toEqual(new Set(['N', 'S']));
  expect(grid.get({x: 0, y: 64}).directions).toEqual(new Set(['N']));
});

test('Build vertical rail with length 3 in the other direction', () => {
  let grid = new Grid();
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 64});
  builder.pointerMove({x: 0, y: 0});
  builder.pointerUp();

  expect(grid.get({x: 0, y: 0}).directions).toEqual(new Set(['S']));
  expect(grid.get({x: 0, y: 32}).directions).toEqual(new Set(['N', 'S']));
  expect(grid.get({x: 0, y: 64}).directions).toEqual(new Set(['N']));
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

  expect(builder.grid.get({x: 0, y: 0}).directions).toEqual(new Set(['S', 'E']));
  expect(builder.grid.get({x: 0, y: 32}).directions).toEqual(new Set(['N', 'E']));
  expect(builder.grid.get({x: 32, y: 0}).directions).toEqual(new Set(['S', 'W']));
  expect(builder.grid.get({x: 32, y: 32}).directions).toEqual(new Set(['N', 'W']));
});

test('Building on water is not permitted', () => {
  let grid = new Grid();
  grid.set({x: 32, y: 32}, new Water());
  let builder = new RailBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 64});
  builder.pointerUp();

  builder.pointerDown({x: 0, y: 32});
  builder.pointerMove({x: 32, y: 32});
  builder.pointerUp();

  expect(builder.grid.count()).toEqual(3 + 1);
});
