export default class Binding {
  constructor(handler, ctx, isOnce) {
    this.handler = handler;
    this.ctx = ctx;
    this.isOnce = isOnce;
  }

  equals(handler, ctx) {
    return this.handler === handler && this.ctx === ctx;
  }
}
