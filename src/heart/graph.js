import FillStyle from './cmd/fill-style';
import StrokeStyle from './cmd/stroke-style';
import ShadowColor from './cmd/shadow-color';
import ShadowBlur from './cmd/shadow-blur';
import ShadowOffsetX from './cmd/shadow-offset-x';
import ShadowOffsetY from './cmd/shadow-offset-y';
import CreateLinearGradient from './cmd/create-linear-gradient';
import CreateRadialGradient from './cmd/create-radial-gradient';
import CreatePattern from './cmd/create-pattern';
import LineCap from './cmd/line-cap';
import LineJoin from './cmd/line-join';
import LineWidth from './cmd/line-width';
import MiterLimit from './cmd/miter-limit';
import Rect from './cmd/rect';
import FillRect from './cmd/fill-rect';
import StrokeRect from './cmd/stroke-rect';
import ClearRect from './cmd/clear-rect';
import Font from './cmd/font';
import TextAlign from './cmd/text-align';
import TextBaseline from './cmd/text-baseline';
import GlobalAlpha from './cmd/global-alpha';
import GlobalCompositeOperation from './cmd/global-composite-operation';
import Fill from './cmd/fill';
import Stroke from './cmd/stroke';
import BeginPath from './cmd/begin-path';
import MoveTo from './cmd/move-to';
import ClosePath from './cmd/close-path';
import LineTo from './cmd/line-to';
import Clip from './cmd/clip';
import QuadraticCurveTo from './cmd/quadratic-curve-to';
import BezierCurveTo from './cmd/bezier-curve-to';
import Arc from './cmd/arc';
import ArcTo from './cmd/arc-to';
import Scale from './cmd/scale';
import Rotate from './cmd/rotate';
import Translate from './cmd/translate';
import Transform from './cmd/transform';
import SetTransform from './cmd/set-transform';
import FillText from './cmd/fill-text';
import StrokeText from './cmd/stroke-text';
import DrawImage from './cmd/draw-image';
import Save from './cmd/save';
import Restore from './cmd/restore';
import Bounds from '../geom/bounds';
import Ellipse from './cmd/ellipse';
import Direction from './cmd/direction';
import Filter from './cmd/filter';
import ImageSmoothingEnabled from './cmd/image-smoothing-enabled';
import ImageSmoothingQuality from './cmd/image-smoothing-quality';
import LineDashOffset from './cmd/line-dash-offset';
import SetLineDash from './cmd/set-line-dash';
import State from './state';
import Path from './path';

export default class Graph {
  constructor() {
    this.commands = [];
    this.path = new Path();
    this.state = new State();
    this.bounds = new Bounds();
    this.stack = [];
  }

  set fillStyle(fillStyle) {
    this.push(new FillStyle(fillStyle));
  }

  set strokeStyle(strokeStyle) {
    this.push(new StrokeStyle(strokeStyle));
  }

  set shadowColor(shadowColor) {
    this.push(new ShadowColor(shadowColor));
  }

  set shadowBlur(shadowBlur) {
    this.push(new ShadowBlur(shadowBlur));
  }

  set shadowOffsetX(shadowOffsetX) {
    this.push(new ShadowOffsetX(shadowOffsetX));
  }

  set shadowOffsetY(shadowOffsetY) {
    this.push(new ShadowOffsetY(shadowOffsetY));
  }

  set lineCap(lineCap) {
    this.push(new LineCap(lineCap));
  }

  set lineJoin(lineJoin) {
    this.push(new LineJoin(lineJoin));
  }

  set lineWidth(lineWidth) {
    this.push(new LineWidth(lineWidth));
  }

  set miterLimit(miterLimit) {
    this.push(new MiterLimit(miterLimit));
  }

  set font(font) {
    this.push(new Font(font));
  }

  set textAlign(textAlign) {
    this.push(new TextAlign(textAlign));
  }

  set textBaseline(textBaseline) {
    this.push(new TextBaseline(textBaseline));
  }

  set globalAlpha(globalAlpha) {
    this.push(new GlobalAlpha(globalAlpha));
  }

  set globalCompositeOperation(globalCompositeOperation) {
    this.push(new GlobalCompositeOperation(globalCompositeOperation));
  }

  set direction(direction) {
    this.push(new Direction(direction));
  }

  set filter(filter) {
    this.push(new Filter(filter));
  }

  set imageSmoothingEnabled(imageSmoothingEnabled) {
    this.push(new ImageSmoothingEnabled(imageSmoothingEnabled));
  }

  set imageSmoothingQuality(imageSmoothingQuality) {
    this.push(new ImageSmoothingQuality(imageSmoothingQuality));
  }

  set lineDashOffset(lineDashOffset) {
    this.push(new LineDashOffset(lineDashOffset));
  }

  get fillStyle() {
    return this.state.fillStyle;
  }

  get strokeStyle() {
    return this.state.strokeStyle;
  }

  get shadowColor() {
    return this.state.shadowColor;
  }

  get shadowBlur() {
    return this.state.shadowBlur;
  }

  get shadowOffsetX() {
    return this.state.shadowOffsetX;
  }

  get shadowOffsetY() {
    return this.state.shadowOffsetY;
  }

  get lineCap() {
    return this.state.lineCap;
  }

  get lineJoin() {
    return this.state.lineJoin;
  }

  get lineWidth() {
    return this.state.lineWidth;
  }

  get miterLimit() {
    return this.state.miterLimit;
  }

  get font() {
    return this.state.font;
  }

  get textAlign() {
    return this.state.textAlign;
  }

  get textBaseline() {
    return this.state.textBaseline;
  }

  get globalAlpha() {
    return this.state.globalAlpha;
  }

  get globalCompositeOperation() {
    return this.state.globalCompositeOperation;
  }

  get direction() {
    return this.state.direction;
  }

  get filter() {
    return this.state.filter;
  }

  get imageSmoothingEnabled() {
    return this.state.imageSmoothingEnabled;
  }

  get imageSmoothingQuality() {
    return this.state.imageSmoothingQuality;
  }

  get lineDashOffset() {
    return this.state.lineDashOffset;
  }

  getLineDash() {
    return this.state.lineDashSegments;
  }

  setLineDash(segments) {
    this.push(new SetLineDash(segments));
  }

  createLinearGradient(x0, y0, x1, y1) {
    const cmd = new CreateLinearGradient(x0, y0, x1, y1);
    this.push(cmd);

    return cmd;
  }

  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    const cmd = new CreateRadialGradient(x0, y0, r0, x1, y1, r1);
    this.push(cmd);

    return cmd;
  }

  createPattern(image, repeat) {
    const cmd = new CreatePattern(image, repeat);
    this.push(cmd);

    return cmd;
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
    this.push(new Ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise));
  }

  rect(x, y, width, height) {
    this.push(new Rect(x, y, width, height));
  }

  fillRect(x, y, width, height) {
    this.push(new FillRect(x, y, width, height));
  }

  strokeRect(x, y, width, height) {
    this.push(new StrokeRect(x, y, width, height));
  }

  clearRect(x, y, width, height) {
    this.push(new ClearRect(x, y, width, height));
  }

  fill(pathOrFillRule, fillRule) {
    this.push(new Fill(pathOrFillRule, fillRule));
  }

  stroke() {
    this.push(new Stroke());
  }

  beginPath() {
    this.push(new BeginPath());
  }

  moveTo(x, y) {
    this.push(new MoveTo(x, y));
  }

  closePath() {
    this.push(new ClosePath());
  }

  lineTo(x, y) {
    this.push(new LineTo(x, y));
  }

  clip() {
    this.push(new Clip());
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this.push(new QuadraticCurveTo(cpx, cpy, x, y));
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.push(new BezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y));
  }

  arc(x, y, r, sAngle, eAngle, counterclockwise) {
    this.push(new Arc(x, y, r, sAngle, eAngle, counterclockwise));
  }

  arcTo(x1, y1, x2, y2, r) {
    this.push(new ArcTo(x1, y1, x2, y2, r));
  }

  scale(x, y) {
    this.push(new Scale(x, y));
  }

  rotate(angle) {
    this.push(new Rotate(angle));
  }

  translate(x, y) {
    this.push(new Translate(x, y));
  }

  transform(a, b, c, d, x, y) {
    this.push(new Transform(a, b, c, d, x, y));
  }

  setTransform(a, b, c, d, x, y) {
    this.push(new SetTransform(a, b, c, d, x, y));
  }

  fillText(text, x, y, maxWidth) {
    this.push(new FillText(text, x, y, maxWidth));
  }

  strokeText(text, x, y, maxWidth) {
    this.push(new StrokeText(text, x, y, maxWidth));
  }

  drawImage(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height) {
    this.push(new DrawImage(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height));
  }

  save() {
    this.push(new Save());
  }

  restore() {
    this.push(new Restore());
  }

  push(cmd) {
    cmd.execSync(this);
    this.commands.push(cmd);
  }

  measureText(text) {

  }

  clear() {
    this.path = new Path();
    this.state = new State();
    this.stack.length = 0;
    this.commands.length = 0;
    this.bounds.set();
  }

  render(ctx) {
    const {commands} = this;
    ctx.save();

    for (let i = 0, l = commands.length; i < l; i++) {
      commands[i].exec(ctx);
    }

    ctx.beginPath();
    ctx.restore();
  }
}
