import Cmd from './cmd';

export default class ScaleCmd extends Cmd {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  execSync(graph) {
    graph.path.transform.scale(this.x, this.y);
  }

  exec(ctx) {
    ctx.scale(this.x, this.y);
  }
}
