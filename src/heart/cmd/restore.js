import Cmd from './cmd';

export default class RestoreCmd extends Cmd {
  execSync(graph) {
    graph.state = graph.stack.pop() || graph.state;
  }

  exec(ctx) {
    ctx.restore();
  }
}
