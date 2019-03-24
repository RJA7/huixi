import Binding from './binding';
import Mat from '../geom/mat';

export default class Signal {
  constructor() {
    this.bindings = [];
  }

  add(handler, ctx, index) {
    this.bindings.splice(this._getIndex(index), 1, new Binding(handler, ctx, false));
    return this;
  }

  addOnce(handler, ctx, index) {
    this.bindings.splice(this._getIndex(index), 1, new Binding(handler, ctx, true));
    return this;
  }

  _getIndex(index) {
    return index ? Mat.clamp(index, 0, this.bindings.length) : this.bindings.length;
  }

  remove(handler, ctx) {
    const {bindings} = this;

    for (let i = bindings.length - 1; i >= 0; i--) {
      if (bindings[i].equals(handler, ctx)) {
        bindings.splice(i, 1);
      }
    }
  }

  dispatch(a, b, c) {
    const {bindings} = this;
    let l = bindings.length;
    let i = 0;

    while (i < l && (bindings[i].ctx ? bindings[i].ctx.call(bindings[i].handler, a, b, c) : bindings[i].handler(a, b, c)) !== false) {
      i++;
    }

    while (l > 0) {
      l--;
      bindings[l].isOnce && bindings.splice(l, 1);
    }

    return this;
  }
}
