import Point from '../../geom/point';
import Cmd from './cmd';

const point = new Point();

export default class LineCmd extends Cmd {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  execSync({path, state}) {
    state.transform.apply(this, point);
    path.initPosition(point);
    path.position.copyFrom(point);

    const {min, max} = path.bounds;

    path.bounds.set(
      Math.min(min.x, point.x),
      Math.min(min.y, point.y),
      Math.max(max.x, point.x),
      Math.max(max.y, point.y),
    );
  }

  exec(ctx) {
    ctx.lineTo(this.x, this.y);
  }
}
