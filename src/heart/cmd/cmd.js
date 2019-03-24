import Matrix from '../../geom/matrix';
import Point from '../../geom/point';
import Mat from '../../geom/mat';

const points = [new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point()];

export default class Cmd {
  constructor() {

  }

  execSync(graph) {

  }

  exec(ctx) {

  }

  static execSyncDrawPath(graph, halfLineWidth) {
    if (!graph.path.bounds.isValid()) return;

    const {bounds: {min, max}} = graph.path;
    Cmd.expandGraphBounds(graph, min.x, min.y, max.x, max.y, halfLineWidth);
  }

  static execSyncDrawRect(graph, x, y, width, height, halfLineWidth) {
    const [a, b, c, d] = points;
    const transform = graph.state.transform;
    transform.apply(a.set(x, y), a);
    transform.apply(b.set(x + width, y), b);
    transform.apply(c.set(x + width, y + height), c);
    transform.apply(d.set(x, y + height), d);

    Cmd.expandGraphBounds(graph, Math.min(a.x, b.x, c.x, d.x), Math.min(a.y, b.y, c.y, d.y), Math.max(a.x, b.x, c.x, d.x), Math.max(a.y, b.y, c.y, d.y), halfLineWidth);
  }

  static expandGraphBounds(graph, minX, minY, maxX, maxY, halfLineWidth) {
    const {bounds: {min, max}, state} = graph;
    const clip = state.clip;

    minX -= halfLineWidth;
    minY -= halfLineWidth;
    maxX += halfLineWidth;
    maxY += halfLineWidth;

    if (clip) {
      minX = Math.max(minX, clip.min.x);
      minY = Math.max(minY, clip.min.y);
      maxX = Math.min(maxX, clip.max.x);
      maxY = Math.min(maxY, clip.max.y);
    }

    graph.bounds.set(
      Math.min(minX, min.x),
      Math.min(minY, min.y),
      Math.max(maxX, max.x),
      Math.max(maxY, max.y),
    );
  }

  static execSyncArc(graph, x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, rotationCos = 1, rotationSin = 0) {
    const {path, state} = graph;
    const transform = new Matrix(rotationCos, rotationSin, -rotationSin, rotationCos, 0, 0);
    Matrix.multiply(state.transform, transform, transform).setTranslation(0, 0);

    const [pos, p0, p1, p2, p3, t0, t1, s, e] = points;

    s.set(Math.cos(startAngle) * radiusX, Math.sin(startAngle) * radiusY);
    e.set(Math.cos(endAngle) * radiusX, Math.sin(endAngle) * radiusY);

    state.transform.apply(pos.set(x, y), pos);
    path.initPosition(transform.apply(s, t0).add(pos));
    transform.apply(s, path.position).add(pos);

    if (startAngle === endAngle) return;

    const rx2 = radiusX * radiusX;
    const ry2 = radiusY * radiusY;
    const lx = Math.sqrt(rx2 * transform.a * transform.a + ry2 * transform.c * transform.c);
    const ly = Math.sqrt(rx2 * transform.b * transform.b + ry2 * transform.d * transform.d);

    const inverted = transform.getInverted();

    Cmd._arcLineIntersection(inverted.apply(t0.set(-lx, -ly), t0), inverted.apply(t1.set(lx, -ly), t1), rx2, ry2, p0);
    Cmd._arcLineIntersection(inverted.apply(t0.set(lx, -ly), t0), inverted.apply(t1.set(lx, ly), t1), rx2, ry2, p1);
    p2.set(-p0.x, -p0.y);
    p3.set(-p1.x, -p1.y);

    const pointsInRange = [s, e];
    const sign = anticlockwise ? -1 : 1;

    if ((endAngle - startAngle) * sign >= Mat.TWO_PI) {
      pointsInRange.push(p0, p1, p2, p3);
    } else {
      const se = s.cross(e);
      const sp0 = s.cross(p0);
      const sp1 = s.cross(p1);
      const sp2 = s.cross(p2);
      const sp3 = s.cross(p3);
      const pe0 = p0.cross(e);
      const pe1 = p1.cross(e);
      const pe2 = p2.cross(e);
      const pe3 = p3.cross(e);
      let f0, f1, f2, f3;

      if (se > 0) {
        f0 = sp0 > 0 && pe0 > 0;
        f1 = sp1 > 0 && pe1 > 0;
        f2 = sp2 > 0 && pe2 > 0;
        f3 = sp3 > 0 && pe3 > 0;
      } else {
        f0 = sp0 > 0 || pe0 > 0;
        f1 = sp1 > 0 || pe1 > 0;
        f2 = sp2 > 0 || pe2 > 0;
        f3 = sp3 > 0 || pe3 > 0;
      }

      if (anticlockwise) {
        f0 = !f0;
        f1 = !f1;
        f2 = !f2;
        f3 = !f3;
      }

      f0 && pointsInRange.push(p0);
      f1 && pointsInRange.push(p1);
      f2 && pointsInRange.push(p2);
      f3 && pointsInRange.push(p3);
    }

    const {min, max} = path.bounds;

    for (let i = 0, l = pointsInRange.length; i < l; i++) {
      const p = pointsInRange[i];
      transform.apply(p, p).add(pos);

      min.x = Math.min(min.x, p.x);
      min.y = Math.min(min.y, p.y);
      max.x = Math.max(max.x, p.x);
      max.y = Math.max(max.y, p.y);
    }
  }

  static _arcLineIntersection(lineStart, lineEnd, rx2, ry2, out) {
    const dx = lineEnd.x - lineStart.x;

    if (dx === 0) {
      const x = lineStart.x;
      const y = Math.sqrt(ry2 * (1 - x * x / rx2));

      out.set(x, y);
    } else {
      const lineK = (lineEnd.y - lineStart.y) / dx;
      const lineB = lineStart.y - lineK * lineStart.x;

      const a = lineK * lineK + ry2 / rx2;
      const b = 2 * lineK * lineB;

      const x = -b / (2 * a);
      const y = lineK * x + lineB;

      out.set(x, y);
    }
  }
}
