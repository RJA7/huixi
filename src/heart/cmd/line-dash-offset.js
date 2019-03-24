import Cmd from './cmd';

export default class LineDashOffsetCmd extends Cmd {
  constructor(lineDashOffset) {
    super();

    this.lineDashOffset = lineDashOffset;
  }

  execSync(graph) {
    graph.state.lineDashOffset = this.lineDashOffset;
  }

  exec(ctx) {
    ctx.lineDashOffset = this.lineDashOffset;
  }
}
