import Cmd from './cmd';

export default class GlobalAlphaCmd extends Cmd {
  constructor(globalAlpha) {
    super();

    this.globalAlpha = globalAlpha;
  }

  execSync(graph) {
    graph.state.globalAlpha = this.globalAlpha;
  }

  exec(ctx) {
    ctx.globalAlpha = this.globalAlpha;
  }
}
