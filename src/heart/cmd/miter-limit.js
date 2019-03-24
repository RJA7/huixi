import Cmd from './cmd';

export default class MiterLimitCmd extends Cmd {
  constructor(miterLimit) {
    super();

    this.miterLimit = miterLimit;
  }

  execSync(graph) {
    graph.state.miterLimit = this.miterLimit;
  }

  exec(ctx) {
    ctx.miterLimit = this.miterLimit;
  }
}
