import Cmd from './cmd';

export default class FillCmd extends Cmd {
  constructor(pathOrFillRule, fillRule) {
    super();

    this.fillRule = fillRule ? fillRule : typeof pathOrFillRule === 'string' ? pathOrFillRule : '';
    this.path = typeof pathOrFillRule === 'object' ? pathOrFillRule : null;

    this._exec = this.path ? this._execPath : this._execNoPath;
  }

  execSync(graph) {
    if (this.path) {
      const {commands} = this.path;

      for (let i = 0, l = commands.length; i < l; i++) {
        commands[i].execSync(graph);
      }
    }

    Cmd.execSyncDrawPath(graph, 0);
  }

  _execPath(ctx) {
    const {commands} = this.path;

    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].exec(ctx);
    }

    ctx.fill(this.fillRule);
  }

  _execNoPath(ctx) {
    ctx.fill(this.fillRule);
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
