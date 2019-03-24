import Cmd from './cmd';

export default class LineWidthCmd extends Cmd {
  constructor(lineWidth) {
    super();

    this.lineWidth = lineWidth;
  }

  execSync(graph) {
    graph.state.lineWidth = this.lineWidth;
  }

  exec(ctx) {
    ctx.lineWidth = this.lineWidth;
  }
}
