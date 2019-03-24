import Cmd from './cmd';

export default class DrawImageCmd extends Cmd {
  constructor(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height) {
    super();

    this.img = img;
    this.srcX = srcX || 0;
    this.srcY = srcY || 0;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  execSync(graph) {
    Cmd.execSyncDrawRect(graph, this.x, this.y, this.width, this.height, 0);
  }

  exec(ctx) {
    ctx.drawImage(this.img, this.srcX, this.srcY, this.srcWidth, this.srcHeight, this.x, this.y, this.width, this.height);
  }
}
