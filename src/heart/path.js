import Bounds from '../geom/bounds';

export default class Path {
  constructor() {
    this.position = null;
    this.start = null;
    this.bounds = new Bounds();
  }

  initPosition(position) {
    this.position = position.clone();
    this.start = position.clone();
    this.initPosition = this._empty;
  }

  _empty() {

  }
}
