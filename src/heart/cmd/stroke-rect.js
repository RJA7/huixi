import Cmd from './cmd';

export default class StrokeRectCmd extends Cmd {
  constructor(x, y, width, height) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  execSync(graph) {
    Cmd.execSyncDrawRect(graph, this.x, this.y, this.width, this.height, graph.state.lineWidth * 0.5);
  }

  exec(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
