export default class Renderer {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
  }

  render(drawOrder) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0, l = drawOrder.length; i < l; i++) {
      drawOrder[i].render(ctx);
    }
  }
}
