import Cmd from './cmd';

export default class GlobalCompositeOperationCmd extends Cmd {
  constructor(globalCompositeOperation) {
    super();

    this.globalCompositeOperation = globalCompositeOperation;
  }

  execSync(graph) {
    graph.state.globalCompositeOperation = this.globalCompositeOperation;
  }

  exec(ctx) {
    ctx.globalCompositeOperation = this.globalCompositeOperation;
  }
}
