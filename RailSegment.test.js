/**
 * Created by Filip on 2018-07-25.
 */
import {
  RailSegmentFactory, WRailSegment, ERailSegment, WERailSegment,
  SRailSegment, NRailSegment, NSRailSegment
} from "./RailSegment.js";

test('Two horizontal positions', () => {
  let factory = new RailSegmentFactory();
  let [first, second] = factory.fromPositionList([
    {x: 0, y: 0},
    {x: 1, y: 0}]);
  expect(first).toBeInstanceOf(ERailSegment);
  expect(second).toBeInstanceOf(WRailSegment);
});

test('Three horizontal positions', () => {
  let factory = new RailSegmentFactory();
  let [first, second, third] = factory.fromPositionList([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0}]);
  expect(first).toBeInstanceOf(ERailSegment);
  expect(second).toBeInstanceOf(WERailSegment);
  expect(third).toBeInstanceOf(WRailSegment);
});

test('Three vertical positions', () => {
  let factory = new RailSegmentFactory();
  let [first, second, third] = factory.fromPositionList([
    {x: 0, y: 1},
    {x: 0, y: 2},
    {x: 0, y: 3}]);
  expect(first).toBeInstanceOf(SRailSegment);
  expect(second).toBeInstanceOf(NSRailSegment);
  expect(third).toBeInstanceOf(NRailSegment);
});
