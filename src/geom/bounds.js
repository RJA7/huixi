import Point from './point';

export default class Bounds {
  constructor(minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = -Number.MAX_VALUE, maxY = -Number.MAX_VALUE) {
    this.min = new Point(minX, minY);
    this.max = new Point(maxX, maxY);
  }

  set(minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = -Number.MAX_VALUE, maxY = -Number.MAX_VALUE) {
    this.min.x = minX;
    this.min.y = minY;
    this.max.x = maxX;
    this.max.y = maxY;

    return this;
  }

  clone() {
    return new Bounds(this.min.x, this.min.y, this.max.x, this.max.y);
  }

  isValid() {
    return this.min.x <= this.max.x && this.min.y <= this.max.y;
  }

  get x() {
    return this.min.x;
  }

  get y() {
    return this.min.y;
  }

  get width() {
    return this.max.x - this.min.x;
  }

  get height() {
    return this.max.y - this.min.y;
  }
}
