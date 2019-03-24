import Cmd from './cmd';

export default class ShadowOffsetYCmd extends Cmd {
  constructor(shadowOffsetY) {
    super();

    this.shadowOffsetY = shadowOffsetY;
  }

  execSync(graph) {
    graph.state.shadowOffsetY = this.shadowOffsetY;
  }

  exec(ctx) {
    ctx.shadowOffsetY = this.shadowOffsetY;
  }
}
