export default class Mat {
  static sign(x) {
    return ((x > 0) - (x < 0)) || +x;
  }

  static clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }
}

Mat.TWO_PI = Math.PI * 2;
Mat.HALF_PI = Math.PI * 0.5;
