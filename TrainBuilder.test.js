/**
 * Created by Filip on 2018-08-13.
 */

import {Grid}  from "./Grid.js";
import {TrainBuilder} from "./TrainBuilder.js";
import {NSRailSegment, RailSegment} from "./RailSegment.js"


test('After train is built on rail, the rail persists', () => {
  let grid = new Grid();
  grid.set({x:0, y: 0}, new NSRailSegment());
  grid.set({x:0, y: 32}, new NSRailSegment());
  let builder = new TrainBuilder(grid);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 0, y: 32});
  builder.pointerUp();

  expect(builder.grid.get({x: 0, y: 0})).toBeInstanceOf(RailSegment);
  expect(builder.grid.get({x: 0, y: 32})).toBeInstanceOf(RailSegment);
});
