import Cmd from './cmd';

export default class LineJoinCmd extends Cmd {
  constructor(lineJoin) {
    super();

    this.lineJoin = lineJoin;
  }

  execSync(graph) {
    graph.state.lineJoin = this.lineJoin;
  }

  exec(ctx) {
    ctx.lineJoin = this.lineJoin;
  }
}
