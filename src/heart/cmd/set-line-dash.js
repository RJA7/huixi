import Cmd from './cmd';

export default class SetLineDashCmd extends Cmd {
  constructor(segments) {
    super();

    this.segments = segments;
  }

  execSync(graph) {
    graph.state.lineDashSegments = this.segments;
  }

  exec(ctx) {
    ctx.setLineDash(this.segments);
  }
}
