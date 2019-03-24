import Cmd from './cmd';

export default class ClosePath extends Cmd {
  execSync({path, state}) {
    path.start && state.transform.getInverted().apply(path.start, path.position);
  }

  exec(ctx) {
    ctx.closePath();
  }
}
