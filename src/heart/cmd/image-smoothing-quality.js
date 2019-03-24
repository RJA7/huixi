import Cmd from './cmd';

export default class ImageSmoothingQualityCmd extends Cmd {
  constructor(imageSmoothingQuality) {
    super();

    this.imageSmoothingQuality = imageSmoothingQuality;
  }

  execSync(graph) {
    graph.state.imageSmoothingQuality = this.imageSmoothingQuality;
  }

  exec(ctx) {
    ctx.imageSmoothingQuality = this.imageSmoothingQuality;
  }
}
