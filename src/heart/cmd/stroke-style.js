import Cmd from './cmd';

export default class StrokeStyleCmd extends Cmd {
  constructor(strokeStyle) {
    super();

    this.strokeStyle = strokeStyle;
    this._exec = strokeStyle.exec ? this._execComplex : this._execColor;
  }

  execSync(graph) {
    graph.state.strokeStyle = this.strokeStyle;
  }

  _execComplex(ctx) {
    ctx.strokeStyle = this.strokeStyle.exec(ctx);
  }

  _execColor(ctx) {
    ctx.strokeStyle = this.strokeStyle;
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
