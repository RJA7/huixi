import Cmd from './cmd';

export default class FillTextCmd extends Cmd {
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
    ctx.fillText(this.text, this.x, this.y, this.maxWidth);
  }
}
