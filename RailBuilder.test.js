/**
 * Created by Filip on 2018-07-26.
 */
import {RailBuilder} from "./RailBuilder.js";
import {ERailSegment, WRailSegment, NRailSegment, NSRailSegment, SRailSegment} from "./RailSegment.js";

test('Build horizontal rail with length 2', () => {
  let builder = new RailBuilder({}, 32);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();

  expect(builder.grid.x0y0).toBeInstanceOf(ERailSegment);
  expect(builder.grid.x32y0).toBeInstanceOf(WRailSegment);
});

test('Build vertical rail with length 3', () => {
  let builder = new RailBuilder({}, 32);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 64});
  builder.pointerUp();

  expect(builder.grid.x0y0).toBeInstanceOf(SRailSegment);
  expect(builder.grid.x0y32).toBeInstanceOf(NSRailSegment);
  expect(builder.grid.x0y64).toBeInstanceOf(NRailSegment);
});

test('Click without moving to another square does nothing', () => {
  let builder = new RailBuilder({}, 32);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 0});
  builder.pointerUp();

  expect(builder.grid).toEqual({});
});

test('Invalid building (plus)', () => {
  let builder = new RailBuilder({}, 32);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 64});
  builder.pointerUp();

  builder.pointerDown({x: 0, y: 32});
  builder.pointerMove({x: 32, y: 32});
  builder.pointerUp();

  expect(Object.keys(builder.grid)).toHaveLength(3);
});
