import Point from '../../geom/point';
import Cmd from './cmd';

const points = [new Point(), new Point(), new Point()];
const ranges = [[], []];

export default class QuadraticCurveCmd extends Cmd {
  constructor(cpx, cpy, x, y) {
    super();

    this.cpx = cpx;
    this.cpy = cpy;
    this.x = x;
    this.y = y;
  }

  execSync({path, state}) {
    const [ra, rb] = ranges;
    const [a, b] = points;
    const {bounds, bounds: {min, max}} = path;
    const {transform} = state;
    transform.apply(a.set(this.cpx, this.cpy), a);
    transform.apply(this, b);

    path.initPosition(a);

    this._range(path.position.x, a.x, b.x, ra);
    this._range(path.position.y, a.y, b.y, rb);

    bounds.set(
      Math.min(min.x, ra[0]),
      Math.min(min.y, ra[1]),
      Math.max(max.x, rb[0]),
      Math.max(max.y, rb[1]),
    );

    path.position.copyFrom(b);
  }

  exec(ctx) {
    ctx.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
  }

  _range(p0, p1, p2, out) {
    const a = p2 - p0;
    const b = p1 - p0;
    const c = b / a;
    const d = p0 + (c < 0 || c > 1 ? b * b / (2 * b - a) : 0);

    out[0] = Math.min(p0, p2, d);
    out[1] = Math.max(p0, p2, d);
  }
}
