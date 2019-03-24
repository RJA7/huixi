import Point from '../../geom/point';
import Cmd from './cmd';

const point = new Point();

export default class MoveTo extends Cmd {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  execSync({path, state}) {
    state.transform.apply(this, point);
    path.initPosition(point);
    path.position.copyFrom(point);
  }

  exec(ctx) {
    ctx.moveTo(this.x, this.y);
  }
}
