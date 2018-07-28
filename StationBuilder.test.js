/**
 * Created by Filip on 2018-07-28.
 */
import {StationBuilder, Station} from "./StationBuilder.js";

test('Build horizontal station with length 2', () => {
  let builder = new StationBuilder({}, 32);

  builder.pointerDown({x: 0, y: 0});
  builder.pointerMove({x: 32, y: 0});
  builder.pointerUp();

  expect(builder.grid.x0y0).toBeInstanceOf(Station);
  expect(builder.grid.x32y0).toBeInstanceOf(Station);
});

