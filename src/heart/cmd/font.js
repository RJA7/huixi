import Cmd from './cmd';

export default class FontCmd extends Cmd {
  constructor(font) {
    super();

    this.font = font;
  }

  execSync(graph) {
    graph.state.font = this.font;
  }

  exec(ctx) {
    ctx.font = this.font;
  }
}
