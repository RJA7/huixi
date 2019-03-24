import Point from '../../src/geom/point';
import {assert} from 'chai';

describe('geom point', () => {
  it('create reset and set', () => {
    const point = new Point();

    assert(point.x === 0);
    assert(point.y === 0);

    const p = point.set(123.321, 234.432);

    assert(p === point);
    assert(point.x === 123.321);
    assert(point.y === 234.432);

    point.set();

    assert(point.x === 0);
    assert(point.y === 0);
  });

  it('copy', () => {
    const a = new Point(1, 2);
    const b = new Point(2, 3);
    const c = a.copyTo(b);

    assert(b === c);
    assert(b.x === a.x);
    assert(b.y === a.y);

    const d = new Point(10, 20);
    const e = d.copyFrom(a);

    assert(e === d);
    assert(d.x === a.x);
    assert(d.y === a.y);

    const f = a.clone();

    assert(f !== a);
    assert(f.x === a.x);
    assert(f.y === a.y);
  });

  it('finds angle', () => {
    const a = new Point();

    assert(a.set(2.3, 0).angle() === 0);
    assert(a.set(3, 3).angle() === Math.PI * 0.25);
    assert(a.set(0, 5.5).angle() === Math.PI * 0.5);
    assert(a.set(-2.1, 2.1).angle() === Math.PI * 0.75);
    assert(a.set(-2.2, 0).angle() === Math.PI);
    assert(a.set(-2.4, -2.4).angle() === -Math.PI * 0.75);
    assert(a.set(0, -2.5).angle() === -Math.PI * 0.5);
    assert(a.set(2.6, -2.6).angle() === -Math.PI * 0.25);

    const b = new Point(2, 1);

    assert(b.angleTo(a.set(2.3 + 2, 1)) === 0);
    assert(b.angleTo(a.set(3 + 2, 3 + 1)) === Math.PI * 0.25);
    assert(b.angleTo(a.set(2, 5.5 + 1)) === Math.PI * 0.5);
    assert(b.angleTo(a.set(-2.1 + 2, 2.1 + 1)) === Math.PI * 0.75);
    assert(b.angleTo(a.set(-2.2 + 2, 1)) === Math.PI);
    assert(b.angleTo(a.set(-2.4 + 2, -2.4 + 1)) === -Math.PI * 0.75);
    assert(b.angleTo(a.set(2, -2.5 + 1)) === -Math.PI * 0.5);
    assert(b.angleTo(a.set(2.5 + 2, -2.5 + 1)) === -Math.PI * 0.25);
  });

  it('finds length', () => {
    const a = new Point(3, -4);

    assert(a.length() === 5);
    assert(a.lengthSq() === 25);

    const b = new Point(100, 500);

    assert(b.distance(a) === a.distance(b));
    assert(b.distance(a.set(100 - 3, 500 + 4)) === 5);
    assert(b.distanceSq(a.set(100 + 3, 500 + 4)) === 25);
  });

  it('dot cross', () => {
    const a = new Point(3, -4);
    const b = new Point(2, 5);

    assert(a.dot(b) === 3 * 2 + -4 * 5);
    assert(a.cross(b) === 3 * 5 - -4 * 2);
  });

  it('scale normalize', () => {
    const a = new Point(30, -40);

    assert(a.normalize().length() === 1);
    assert(a.scale(100.1).length() === 100.1);
    assert(a.scale(2).length() === 200.2);
  });

  it('rotates', () => {
    const a = new Point(10, 0);

    assert(a.rotate(1.5).angle() === 1.5);
    assert(a.length() === a.rotate(200500).length());
  });
});
