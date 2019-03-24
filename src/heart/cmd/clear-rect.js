import Cmd from './cmd';

export default class ClearRectCmd extends Cmd {
  constructor(x, y, width, height) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  exec(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}
