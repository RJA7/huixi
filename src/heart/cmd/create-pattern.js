import Cmd from './cmd';

export default class CreatePatternCmd extends Cmd {
  constructor(image, repeat) {
    super();

    this.image = image;
    this.repeat = repeat;
    this.native = null;
    this._exec = this._execDirty;
  }

  _execDirty(ctx) {
    const native = ctx.createPattern(this.image, this.repeat);
    this.native = native;
    this._exec = this._execClean;

    return native;
  }

  _execClean(ctx) {
    return this.native;
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
