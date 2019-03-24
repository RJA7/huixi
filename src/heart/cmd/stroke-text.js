import Cmd from './cmd';

export default class StrokeText extends Cmd {
  constructor(text, x, y, maxWidth) {
    super();

    this.text = text;
    this.x = x;
    this.y = y;
    this.maxWidth = maxWidth;
  }

  execSync(graph) {

  }

  exec(ctx) {
    ctx.strokeText(this.text, this.x, this.y, this.maxWidth);
  }
}
