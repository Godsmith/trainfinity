/**
 * Created by Filip on 2018-11-30.
 */

import {Grid}  from "./Grid.js";
import {Locomotive} from "./Locomotive.js"
import {NSRailSegment} from "./RailSegment.js"


let grid = new Grid();
grid.set({x: 0, y: 0}, new NSRailSegment());
let locomotive;

beforeEach(() => {
  locomotive = new Locomotive(mockedScene, grid, 0, 0, 'N');
});

test('Calling _addPath with a non-direction argument raises error', () => {
  expect(() => {
    locomotive._addPath(0)
  }).toThrow();
});

describe('preUpdate', () => {
  test('A step along the current path', () => {
    locomotive.preUpdate(0, 10)
  });
  test('After finishing the path', () => {
    locomotive.preUpdate(0, 1000)
  });
});

describe('_calculateDirection', () => {
  test('going down means heading south', () => {
    locomotive.previousY = -10;
    locomotive._calculateDirection();
    expect(locomotive.direction).toEqual('S')
  });

  test('going up means heading north', () => {
    locomotive.previousY = 10;
    locomotive._calculateDirection();
    expect(locomotive.direction).toEqual('N')
  });

  test('going left means heading west', () => {
    locomotive.previousX = 10;
    locomotive._calculateDirection();
    expect(locomotive.direction).toEqual('W')
  });

  test('going right means heading east', () => {
    locomotive.previousX = -10;
    locomotive._calculateDirection();
    expect(locomotive.direction).toEqual('E')
  });
});
