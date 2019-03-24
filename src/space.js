import Matrix from './geom/matrix';

export default class Space {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.angleX = 0;
    this.angleY = 0;

    this.matrix = new Matrix();
    this.parent = null;
    this._hash = '';
  }

  setPos(x = 0, y = x) {
    this.x = x;
    this.y = y;

    return this;
  }

  setScale(x = 1, y = x) {
    this.scaleX = x;
    this.scaleY = y;

    return this;
  }

  setAngle(x = 0, y = x) {
    this.angleX = x;
    this.angleY = y;

    return this;
  }

  getMatrix() {
    const hash = this.getHash();

    if (hash !== this._hash) {
      this._hash = hash;

      this.matrix.set()
        .setTranslation(this.x, this.y)
        .setAngle(this.angleX, this.angleY)
        .scale(this.scaleX, this.scaleY);

      this.parent && this.matrix.multiply(this.parent.getMatrix());
    }

    return this.matrix;
  }

  getHash() {
    return `${this.parent ? this.parent.getHash() : ''}_x${this.x}y${this.y}sx${this.scaleX}sy${this.scaleY}ax${this.angleX}ay${this.angleY}`;
  }

  get scale() {
    return this.scaleX;
  }

  set scale(scale) {
    this.scaleX = scale;
    this.scaleY = scale;
  }

  get angle() {
    return this.angleX;
  }

  set angle(angle) {
    this.angleX = angle;
    this.angleY = angle;
  }
}
