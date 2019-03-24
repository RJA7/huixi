import Cmd from './cmd';

export default class ArcCmd extends Cmd {
  constructor(x, y, radius, startAngle, endAngle, anticlockwise) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = anticlockwise;
  }

  execSync(graph) {
    Cmd.execSyncArc(graph, this.x, this.y, this.radius, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
  }

  exec(ctx) {
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
  }
}
