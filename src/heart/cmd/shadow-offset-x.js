import Cmd from './cmd';

export default class ShadowOffsetX extends Cmd {
  constructor(shadowOffsetX) {
    super();

    this.shadowOffsetX = shadowOffsetX;
  }

  execSync(graph) {
    graph.state.shadowOffsetX = this.shadowOffsetX;
  }

  exec(ctx) {
    ctx.shadowOffsetX = this.shadowOffsetX;
  }
}
