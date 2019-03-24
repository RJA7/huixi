import Matrix from '../../geom/matrix';
import Cmd from './cmd';

export default class TransformCmd extends Cmd {
  constructor(a, b, c, d, x, y) {
    super();

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.x = x;
    this.y = y;
  }

  execSync(graph) {
    const transform = graph.state.transform;
    Matrix.multiply(transform, this, transform);
  }

  exec(ctx) {
    ctx.transform(this.a, this.b, this.c, this.d, this.x, this.y);
  }
}
