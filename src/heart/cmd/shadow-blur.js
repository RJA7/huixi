import Cmd from './cmd';

export default class ShadowBlurCmd extends Cmd {
  constructor(shadowBlur) {
    super();

    this.shadowBlur = shadowBlur;
  }

  execSync(graph) {
    graph.state.shadowBlur = this.shadowBlur;
  }

  exec(ctx) {
    ctx.shadowBlur = this.shadowBlur;
  }
}
