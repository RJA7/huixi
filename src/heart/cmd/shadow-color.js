import Cmd from './cmd';

export default class ShadowColorCmd extends Cmd {
  constructor(shadowColor) {
    super();

    this.shadowColor = shadowColor;
  }

  execSync(graph) {
    graph.state.shadowColor = this.shadowColor;
  }

  exec(ctx) {
    ctx.shadowColor = this.shadowColor;
  }
}
