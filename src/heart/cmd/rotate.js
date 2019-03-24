import Cmd from './cmd';

export default class RotateCmd extends Cmd {
  constructor(angle) {
    super();

    this.angle = angle;
  }

  execSync(graph) {
    graph.state.transform.rotate(this.angle);
  }

  exec(ctx) {
    ctx.rotate(this.angle);
  }
}
