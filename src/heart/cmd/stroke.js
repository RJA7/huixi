import Cmd from './cmd';

export default class StrokeCmd extends Cmd {
  constructor(path) {
    super();

    this.path = path;
    this._exec = this.path ? this._execPath : this._execNoPath;
  }

  execSync(graph) {
    if (this.path) {
      const {commands} = this.path;

      for (let i = 0, l = commands.length; i < l; i++) {
        commands[i].execSync(graph);
      }
    }

    Cmd.execSyncDrawPath(graph, graph.state.lineWidth * 0.5);
  }

  _execPath(ctx) {
    const {commands} = this.path;

    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].exec(ctx);
    }

    ctx.stroke();
  }

  _execNoPath(ctx) {
    ctx.stroke();
  }

  exec(ctx) {
    this._exec(ctx);
  }
}
