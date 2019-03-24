import Cmd from './cmd';

export default class ImageSmoothingEnabledCmd extends Cmd {
  constructor(imageSmoothingEnabled) {
    super();

    this.imageSmoothingEnabled = imageSmoothingEnabled;
  }

  execSync(graph) {
    graph.state.imageSmoothingEnabled = this.imageSmoothingEnabled;
  }

  exec(ctx) {
    ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;
  }
}
