export default class Circle {
  constructor(x = 0, y = 0, radius = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  set(x = 0, y = 0, radius = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    return this;
  }

  copyTo(circle) {
    circle.x = this.x;
    circle.y = this.y;
    circle.radius = this.radius;

    return circle;
  }

  copyFrom(circle) {
    this.x = circle.x;
    this.y = circle.y;
    this.radius = circle.radius;

    return this;
  }

  clone() {
    return new Circle(this.x, this.y, this.radius);
  }
}
