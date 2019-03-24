import DrawOrder from './draw-order';
import Signal from './events/signal';
import Renderer from './renderer';

export default class Game {
  constructor(canvas) {
    this.renderer = new Renderer(canvas);
    this.drawOrder = new DrawOrder();
    this.requstedFrame = null;
    this.frameId = 0;
    this.lastTickTime = Date.now() - 16;
    this._tick = this._tick.bind(this);

    this.onTick = new Signal();

    this.start();
  }

  start() {
    this.requstedFrame === null && this._tick();
  }

  _tick() {
    const now = Date.now();
    const dt = now - this.lastTickTime;

    this.requstedFrame = requestAnimationFrame(this._tick);
    this.lastTickTime = now;
    this.frameId++;

    this.onTick.dispatch(dt, this.frameId);
    this.renderer.render(this.drawOrder);
  }

  stop() {
    cancelAnimationFrame(this.requstedFrame);
    this.requstedFrame = null;
  }
}
