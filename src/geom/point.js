export default class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    return this;
  }

  copyTo(point) {
    point.x = this.x;
    point.y = this.y;

    return point;
  }

  copyFrom(point) {
    this.x = point.x;
    this.y = point.y;

    return this;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  angleTo(point) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  distance(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  distanceSq(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;

    return dx * dx + dy * dy;
  }

  dot(point) {
    return this.x * point.x + this.y * point.y;
  }

  cross(point) {
    return this.x * point.y - this.y * point.x;
  }

  add(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
  }

  sub(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
  }

  scale(length) {
    this.x *= length;
    this.y *= length;

    return this;
  }

  normalize() {
    const l = 1 / Math.sqrt(this.x * this.x + this.y * this.y);

    this.x *= l;
    this.y *= l;

    return this;
  }

  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const {x, y} = this;

    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;

    return this;
  }
}
