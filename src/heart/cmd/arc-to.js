import Point from '../../geom/point';
import Mat from '../../geom/mat';
import Cmd from './cmd';

const points = [new Point(), new Point(), new Point(), new Point()];

export default class ArcToCmd extends Cmd {
  constructor(x1, y1, x2, y2, radius) {
    super();

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.radius = radius;
  }

  execSync(graph) {
    const path = graph.path;
    const radius = this.radius;
    const [start, cp, end, pos] = points;
    cp.set(this.x1, this.y1);
    graph.state.transform.apply(cp, pos);

    path.initPosition(pos);

    if (path.position.x === cp.x && path.position.y === cp.y) return;

    path.transform.getInverted().apply(path.position, start);

    start.sub(cp).normalize();
    end.set(this.x2, this.y2).sub(cp).normalize();

    const cross = start.cross(end);
    const angle = Math.acos(start.dot(end)) / 2;
    const length = radius / Math.tan(angle);

    pos.copyFrom(start).rotate(angle * Mat.sign(cross)).scale(radius / Math.sin(angle)).add(cp);
    start.scale(length).add(cp);
    end.scale(length).add(cp);

    Cmd.execSyncArc(graph, pos.x, pos.y, radius, radius, pos.angleTo(start), pos.angleTo(end), cross > 0);
  }

  exec(ctx) {
    ctx.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
  }
}
