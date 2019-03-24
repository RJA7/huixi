import Point from '../../geom/point';
import Cmd from './cmd';

const points = [new Point(), new Point(), new Point()];
const ranges = [[], []];

export default class BezierCurveToCmd extends Cmd {
  constructor(cp1x, cp1y, cp2x, cp2y, x, y) {
    super();

    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.x = x;
    this.y = y;
  }

  execSync({path, state}) {
    const [ra, rb] = ranges;
    const [a, b, c] = points;
    const {bounds, bounds: {min, max}} = path;
    const {transform} = state;
    transform.apply(a.set(this.cp1x, this.cp1y), a);
    transform.apply(b.set(this.cp2x, this.cp2y), b);
    transform.apply(this, c);

    path.initPosition(a);

    this._range(path.position.x, a.x, b.x, c.x, ra);
    this._range(path.position.y, a.y, b.y, c.y, rb);

    bounds.set(
      Math.min(min.x, ra[0]),
      Math.min(min.y, ra[1]),
      Math.max(max.x, rb[0]),
      Math.max(max.y, rb[1]),
    );

    path.position.copyFrom(c);
  }

  exec(ctx) {
    ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y);
  }

  _range(p0, p1, p2, p3, out) {
    const a = (p2 - 2 * p1 + p0) - (p3 - 2 * p2 + p1);
    const b = 2 * (p1 - p0) - 2 * (p2 - p1);
    const c = p0 - p1;
    const discriminant = b * b - 4 * a * c;

    let min = Math.min(p0, p3);
    let max = Math.max(p0, p3);

    if (discriminant >= 0) {
      const discRoot = Math.sqrt(discriminant);
      const inv2a = 1 / (a * 2);
      let x1 = (-b + discRoot) * inv2a;
      let x2 = (-b - discRoot) * inv2a;
      x1 = isFinite(x1) ? x1 : 0.5;
      x2 = isFinite(x2) ? x2 : 0.5;

      if (x1 > 0 && x1 < 1) {
        const dot = this._dot(p0, p1, p2, p3, x1);
        min = Math.min(dot, min);
        max = Math.max(dot, max);
      }

      if (x2 > 0 && x2 < 1) {
        const dot = this._dot(p0, p1, p2, p3, x2);
        min = Math.min(dot, min);
        max = Math.max(dot, max);
      }
    }

    out[0] = min;
    out[1] = max;
  }

  _dot(p0, p1, p2, p3, x) {
    const y = 1 - x;
    return p0 * y * y * y + 3 * p1 * x * y * y + 3 * p2 * x * x * y + p3 * x * x * x;
  }
}
