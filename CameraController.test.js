/**
 * Created by Filip on 2018-07-28.
 */
import {CameraController} from "./CameraController.js";

test('Scroll when the pointer is pressed', () => {
  let controller = new CameraController();

  controller.pointerDown({x: 0, y: 0});
  let scroll = controller.pointerMove({x: 32, y: 32});

  expect(scroll).toEqual([32, 32]);
});

test('Do not scroll after the pointer has been released', () => {
  let controller = new CameraController();

  controller.pointerDown({x: 0, y: 0});
  controller.pointerUp();
  let scroll = controller.pointerMove({x: 32, y: 32});

  expect(scroll).toEqual([0, 0]);
});
