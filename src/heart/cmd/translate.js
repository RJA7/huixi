import Cmd from './cmd';

export default class Translate extends Cmd {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  execSync(graph) {
    graph.state.transform.translate(this.x, this.y);
  }

  exec(ctx) {
    ctx.translate(this.x, this.y);
  }
}
