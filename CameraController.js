/**
 * Created by Filip on 2018-07-28.
 */
class CameraController {
  constructor() {
    this._draggingCamera = false;
  }

  pointerUp() {
    this._draggingCamera = false;
  }

  pointerDown(pointer) {
    this.lastPointerX = pointer.x;
    this.lastPointerY = pointer.y;
    this._draggingCamera = true;
  }

  /**
   * Called when the pointer moves. If the camera is currently dragged, return by how much.
   * @param pointer The pointer object, with an x and a y value.
   * @returns {Array} An array with two integers, giving the change in pixels in X- and Y-direction
   * the move of the pointer will result in.
   */
  pointerMove(pointer) {
    console.log('pointerMove');
    if (this._draggingCamera) {
      let retVal = [pointer.x - this.lastPointerX, pointer.y - this.lastPointerY];
      this.lastPointerX = pointer.x;
      this.lastPointerY = pointer.y;
      return retVal;
    } else {
      return [0, 0]
    }
  }

}
export {CameraController};
