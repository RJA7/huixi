import Cmd from './cmd';

export default class Ellipse extends Cmd {
  constructor(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    super();

    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.rotation = rotation;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = anticlockwise;

    this._exec = CanvasRenderingContext2D.prototype.ellipse ? this._execNative : this._execShim;
  }

  execSync(graph) {
    Cmd.execSyncArc(graph, this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, Math.cos(this.rotation), Math.sin(this.rotation));
  }

  _execShim(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.radiusX, this.radiusY);
    ctx.arc(0, 0, 1, this.startAngle, this.endAngle, this.anticlockwise);
    ctx.restore();
  }

  _execNative(ctx) {
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle, this.anticlockwise);
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
