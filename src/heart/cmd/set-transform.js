import Cmd from './cmd';

export default class SetTransformCmd extends Cmd {
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
    graph.state.transform.copyFrom(this);
  }

  exec(ctx) {
    ctx.setTransform(this.a, this.b, this.c, this.d, this.x, this.y);
  }
}
