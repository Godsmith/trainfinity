/**
 * Created by Filip on 2018-12-01.
 */

import {Grid}  from "./Grid.js";
import {Wagon} from "./Wagon.js"
import {Locomotive} from "./Locomotive.js"

let grid = new Grid();
let locomotive;
let wagon;

beforeEach(() => {
  locomotive = new Locomotive(mockedScene, grid, 0, 0, 'N');
  wagon = new Wagon(mockedScene, grid, 0, 32, locomotive)
});

describe('preUpdate', () => {
  test('if the leader has moved, move forward to keep up', () => {
    locomotive.y = -1;
    wagon.preUpdate();

    expect(wagon.y).toEqual(31);
  });
  test('if the leader moves closer, stay put', () => {
    locomotive.y = 1;
    wagon.preUpdate();

    expect(wagon.y).toEqual(32);
  });
  test('if moving forward makes the wagon go further from the leader, change direction and adjust position', () => {
    wagon.direction = 'W';
    locomotive.y = -1;
    wagon.preUpdate();

    expect(wagon.x).toEqual(0);
    expect(wagon.direction).toEqual('N')
  });
});
