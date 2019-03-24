import Matrix from '../geom/matrix';

export default class State {
  constructor() {
    this.fillStyle = '#000000';
    this.filter = 'none';
    this.font = '10px sans-serif';
    this.globalAlpha = 1;
    this.globalCompositeOperation = 'source-over';
    this.imageSmoothingEnabled = true;
    this.imageSmoothingQuality = 'low';
    this.lineCap = 'butt';
    this.lineDashOffset = 0;
    this.lineJoin = 'miter';
    this.lineWidth = 1;
    this.miterLimit = 10;
    this.shadowBlur = 0;
    this.shadowColor = '#000000';
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.strokeStyle = '#000000';
    this.textAlign = 'start';
    this.textBaseline = 'alphabetic';
    this.direction = 'inherit';
    this.filter = 'none';
    this.lineDashOffset = 0;
    this.lineDashSegments = [];
    this.clip = null;
    this.transform = new Matrix();
  }
};
