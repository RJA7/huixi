import Cmd from './cmd';

export default class ClipCmd extends Cmd {
  constructor(path) {
    super();

    this.path = path;
    this._exec = this.path ? this._execPath : this._execNoPath;
  }

  execSync(graph) {
    const path = this.path || graph.path;
    graph.state.clip = path.bounds.isValid() ? path.bounds.clone() : null;
  }

  _execPath(ctx) {
    const {commands} = this.path;

    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].exec(ctx);
    }

    ctx.clip();
  }

  _execNoPath(ctx) {
    ctx.clip();
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
