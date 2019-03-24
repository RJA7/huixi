import Cmd from './cmd';

export default class LineCapCmd extends Cmd {
  constructor(lineCap) {
    super();

    this.lineCap = lineCap;
  }

  execSync(graph) {
    graph.state.lineCap = this.lineCap;
  }

  exec(ctx) {
    ctx.lineCap = this.lineCap;
  }
}
