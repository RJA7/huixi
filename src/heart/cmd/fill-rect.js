import Cmd from './cmd';

export default class FillRectCmd extends Cmd {
  constructor(x, y, width, height) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  execSync(graph) {
    Cmd.execSyncDrawRect(graph, this.x, this.y, this.width, this.height, 0);
  }

  exec(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
