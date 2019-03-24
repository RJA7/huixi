import Cmd from './cmd';

export default class TextBaseline extends Cmd {
  constructor(textBaseline) {
    super();

    this.textBaseline = textBaseline;
  }

  execSync(graph) {
    graph.state.textBaseline = this.textBaseline;
  }

  exec(ctx) {
    ctx.textBaseline = this.textBaseline;
  }
}
