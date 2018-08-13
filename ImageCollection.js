/**
 * Created by Filip on 2018-08-08.
 */

// TODO: remove the need to have these imagecollections by storing images to the grid instead
class ImageCollection {
  constructor() {
    this._images = {};
  }

  /**
   * Adds new images to the collection and destroys the images
   * that were at the same locations.
   * @param images Array of new images.
   */
  add(images) {
    for (let image of images) {
      let old_image = this._images['x' + image.x + 'y' + image.y];
      if (old_image) {
        old_image.destroy();
      }
      this._images['x' + image.x + 'y' + image.y] = image;
    }
  }
}

export {ImageCollection};
