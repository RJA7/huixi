import Point from './point';

export default class Matrix {
  constructor(a = 1, b = 0, c = 0, d = 1, x = 0, y = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.x = x;
    this.y = y;

    this._inverted = null;
    this._getInverted = this._getInvertedDirty;
  }

  set(a = 1, b = 0, c = 0, d = 1, x = 0, y = 0) {
    this._getInverted = this._getInvertedDirty;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.x = x;
    this.y = y;

    return this;
  }

  copyTo(matrix) {
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.x = this.x;
    matrix.y = this.y;

    return matrix;
  }

  copyFrom(matrix) {
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.x = matrix.x;
    this.y = matrix.y;

    return this;
  }

  clone() {
    return new Matrix(this.a, this.b, this.c, this.d, this.x, this.y);
  }

  translate(x, y) {
    this._getInverted = this._getInvertedDirty;
    this.x += x;
    this.y += y;

    return this;
  }

  setTranslation(x, y) {
    this._getInverted = this._getInvertedDirty;
    this.x = x;
    this.y = y;

    return this;
  }

  scale(x, y = x) {
    this._getInverted = this._getInvertedDirty;
    this.a *= x;
    this.b *= x;
    this.c *= y;
    this.d *= y;

    return this;
  }

  setScale(x, y = x) {
    const {a, b, c, d} = this;
    this._getInverted = this._getInvertedDirty;

    return this.scale(x / Math.sqrt(a * a + b * b), y / Math.sqrt(c * c + d * d));
  }

  rotate(x, y = x) {
    return this.setAngle(x + Math.atan2(this.b, this.a), y + Math.atan2(this.d, this.c));
  }

  setAngle(x, y = x) {
    const {a, b, c, d} = this;
    const cosX = Math.cos(x);
    const sinX = Math.sin(x);
    const cosY = x === y ? cosX : Math.cos(y);
    const sinY = x === y ? cosY : Math.sin(y);

    this._getInverted = this._getInvertedDirty;
    this.a = a * cosY - b * sinX;
    this.b = a * sinY + b * cosX;
    this.c = c * cosY - d * sinX;
    this.d = c * sinY + d * cosX;

    return this;
  }

  _invert() {
    const {a, b, c, d, x, y} = this;
    const denominator = a * d - b * c;
    const inverted = new Matrix();
    this._inverted = inverted;

    if (denominator === 0) {
      inverted.a = 0;
      inverted.b = 0;
      inverted.c = 0;
      inverted.d = 0;
      inverted.x = -x;
      inverted.y = -y;
    } else {
      const invD = 1 / denominator;

      inverted.a = d * invD;
      inverted.b = -b * invD;
      inverted.c = -c * invD;
      inverted.d = a * invD;
      inverted.x = (c * y - d * x) * invD;
      inverted.y = (b * x - a * y) * invD;
    }

    return inverted;
  }

  _getInvertedDirty() {
    this._invert();
    this._getInverted = this._getInvertedClean;

    return this._inverted;
  }

  _getInvertedClean() {
    return this._inverted;
  }

  getInverted() {
    return this._getInverted();
  }

  static multiply(parent, child, out = new Matrix()) {
    const {a, b, c, d, x, y} = child;
    const {a: pa, b: pb, c: pc, d: pd, x: px, y: py} = parent;

    out._getInverted = out._getInvertedDirty;
    out.a = pa * a + pc * b;
    out.b = pb * a + pd * b;
    out.c = pa * c + pc * d;
    out.d = pb * c + pd * d;
    out.x = pa * x + pc * y + px;
    out.y = pb * x + pd * y + py;

    return out;
  }

  apply(point, out = new Point()) {
    const {a, b, c, d, x, y} = this;
    const {x: px, y: py} = point;

    out.x = a * px + c * py + x;
    out.y = b * px + d * py + y;

    return out;
  }

  get e() {
    return this.x;
  }

  get f() {
    return this.y;
  }

  set e(e) {
    this._getInverted = this._getInvertedDirty;
    this.x = e;
  }

  set f(f) {
    this._getInverted = this._getInvertedDirty;
    this.y = f;
  }
}
