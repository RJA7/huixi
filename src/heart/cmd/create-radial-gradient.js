import Cmd from './cmd';

export default class CreateRadialGradient extends Cmd {
  constructor(x0, y0, r0, x1, y1, r1) {
    super();

    this.x0 = x0;
    this.y0 = y0;
    this.r0 = r0;
    this.x1 = x1;
    this.y1 = y1;
    this.r1 = r1;
    this.offsets = [];
    this.colors = [];
    this.native = null;
    this._exec = this._execDirty;
  }

  addColorStop(offset, color) {
    this.offsets.push(offset);
    this.colors.push(color);
  }

  _execDirty(ctx) {
    const {x0, y0, r0, x1, y1, r1, offsets, colors} = this;
    const native = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    this.native = native;
    this._exec = this._execClean;

    for (let i = 0, l = offsets.length; i < l; i++) {
      native.addColorStop(offsets[i], colors[i]);
    }

    return native;
  }

  _execClean(ctx) {
    return this.native;
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
