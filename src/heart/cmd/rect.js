import Point from '../../geom/point';
import Cmd from './cmd';

const points = [new Point(), new Point(), new Point(), new Point()];

export default class RectCmd extends Cmd {
  constructor(x, y, width, height) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  execSync({path, state}) {
    const [a, b, c, d] = points;
    const {x, y, width, height} = this;
    const {transform} = state;
    const {min, max} = path.bounds;

    transform.apply(this, a);
    transform.apply(b.set(x + width, y), b);
    transform.apply(c.set(x + width, y + height), c);
    transform.apply(d.set(x, y + height), d);

    path.bounds.set(
      Math.min(min.x, a.x, b.x, c.x, d.x),
      Math.min(min.y, a.y, b.y, c.y, d.y),
      Math.max(max.x, a.x, b.x, c.x, d.x),
      Math.max(max.y, a.y, b.y, c.y, d.y),
    );

    path.initPosition(a);
    path.position.copyFrom(a);
  }

  exec(ctx) {
    ctx.rect(this.x, this.y, this.width, this.height);
  }
}
