import Cmd from './cmd';

export default class SaveCmd extends Cmd {
  execSync(graph) {
    graph.stack.push(graph.state.clone());
  }

  exec(ctx) {
    ctx.save();
  }
}
