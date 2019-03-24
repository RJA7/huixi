import Cmd from './cmd';

export default class DirectionCmd extends Cmd {
  constructor(direction) {
    super();

    this.direction = direction;
  }

  execSync(graph) {
    graph.state.direction = this.direction;
  }

  exec(ctx) {
    ctx.direction = this.direction;
  }
}
