import Cmd from './cmd';

export default class TextAlignCmd extends Cmd {
  constructor(textAlign) {
    super();

    this.textAlign = textAlign;
  }

  execSync(graph) {
    graph.state.textAlign = this.textAlign;
  }

  exec(ctx) {
    ctx.textAlign = this.textAlign;
  }
}
