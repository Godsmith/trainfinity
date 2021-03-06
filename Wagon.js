/**
 * Created by Filip on 2018-12-01.
 */
import {TILESIZE} from "./world/constants.js"

class Wagon extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, leader) {
    super(scene, x, y, 'wagon');
    this._leader = leader;
    this._setDirectionToLeaderDirection();
    this.previousX = x;
    this.previousY = y;
    this.depth = 1;  // Display this on top of rail, which has depth 0
  }

  _setDirectionToLeaderDirection() {
    this.direction = this._leader.direction;
    this._setAngle();
    if (this.direction == 'N' || this.direction == 'S') {
      this.x = this._leader.x;
    } else {
      this.y = this._leader.y;
    }
  }

  _distanceToLeader() {
    return Math.abs(this.x - this._leader.x) + Math.abs(this.y - this._leader.y);
    // return Phaser.Math.Distance.Between(this.x, this.y, this._leader.x, this._leader.y)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    let distanceToLeader = this._distanceToLeader();

    if (this._leaderFarAway()) {
      this._goForward(distanceToLeader - TILESIZE);

      let newDistanceToLeader = this._distanceToLeader();

      if (newDistanceToLeader > distanceToLeader) {
        this._setDirectionToLeaderDirection()
      }
    }
  }

  _leaderFarAway() {
    return this._distanceToLeader() > TILESIZE;
  }

  _goForward(distance) {
    let deltaPairs = {
      'N': {dx: 0, dy: -distance},
      'S': {dx: 0, dy: distance},
      'W': {dx: -distance, dy: 0},
      'E': {dx: distance, dy: 0}
    };
    let dx = deltaPairs[this.direction].dx;
    let dy = deltaPairs[this.direction].dy;
    this.setPosition(this.x + dx, this.y + dy);
  }

  _setAngle() {
    this.angle = {'N': 0, 'E': 90, 'S': 180, 'W': 270}[this.direction];
  }
}

export {Wagon};
