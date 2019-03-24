import Cmd from './cmd';

export default class FillStyleCmd extends Cmd {
  constructor(fillStyle) {
    super();

    this.fillStyle = fillStyle;
    this._exec = fillStyle.exec ? this._execComplex : this._execColor;
  }

  execSync(graph) {
    graph.state.fillStyle = this.fillStyle;
  }

  _execComplex(ctx) {
    ctx.fillStyle = this.fillStyle.exec(ctx);
  }

  _execColor(ctx) {
    ctx.fillStyle = this.fillStyle;
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
