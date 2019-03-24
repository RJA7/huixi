import Cmd from './cmd';

export default class FilterCmd extends Cmd {
  constructor(filter) {
    super();

    this.filter = filter;
  }

  execSync(graph) {
    graph.state.filter = this.filter;
  }

  exec(ctx) {
    ctx.filter = this.filter;
  }
}
