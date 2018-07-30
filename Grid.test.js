/**
 * Created by Filip on 2018-07-30.
 */

import {Grid} from "./Grid.js";

test('Adjacent positions', () => {
  let grid = new Grid();

  expect(grid.adjacent({x:0, y:0})).toEqual(new Set([
    {x:-32, y:0},
    {x:0, y:-32},
    {x:32, y:0},
    {x:0, y:32},
  ]));
});
