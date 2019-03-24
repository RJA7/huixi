export default class DrawOrder extends Array {
  render(ctx) {
    for (let i = 0, l = this.length; i < l; i++) {
      this[i].render(ctx);
    }
  }
}
