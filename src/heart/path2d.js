import Rect from './cmd/rect';
import MoveTo from './cmd/move-to';
import ClosePath from './cmd/close-path';
import LineTo from './cmd/line-to';
import QuadraticCurveTo from './cmd/quadratic-curve-to';
import BezierCurveTo from './cmd/bezier-curve-to';
import Arc from './cmd/arc';
import ArcTo from './cmd/arc-to';
import BeginPath from './cmd/begin-path';
import Ellipse from './cmd/ellipse';
import Transform from './cmd/transform';

export default class Path2D {
  constructor() {
    this.commands = [];
    this.push(new BeginPath());
  }

  addPath(path, transform) {
    const inverted = transform.getInverted();

    this.commands.push(
      new Transform(transform.a, transform.b, transform.c, transform.d, transform.e, transform.f),
      ...path.commands,
      new Transform(inverted.a, inverted.b, inverted.c, inverted.d, inverted.e, inverted.f),
    );
  }

  closePath() {
    this.push(new ClosePath());
  }

  moveTo(x, y) {
    this.push(new MoveTo(x, y));
  }

  lineTo(x, y) {
    this.push(new LineTo(x, y));
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this.push(new QuadraticCurveTo(cpx, cpy, x, y));
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.push(new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
  }

  arc(x, y, r, sAngle, eAngle, counterclockwise) {
    this.push(new Arc(x, y, r, sAngle, eAngle, counterclockwise));
  }

  arcTo(x1, y1, x2, y2, r) {
    this.push(new ArcTo(x1, y1, x2, y2, r));
  }

  rect(x, y, width, height) {
    this.push(new Rect(x, y, width, height));
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    this.push(new Ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise));
  }

  push(cmd) {
    this.commands.push(cmd);
  }

  exec(ctx) {
    const {commands} = this;

    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].exec(ctx);
    }
  }
}
