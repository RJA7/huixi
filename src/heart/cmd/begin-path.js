import Path from '../path';
import Cmd from './cmd';

export default class BeginPathCmd extends Cmd {
  execSync(graph) {
    graph.path = new Path();
  }

  exec(ctx) {
    ctx.beginPath();
  }
}
