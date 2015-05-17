import Util from './Util';

export default class Graphic {

  constructor () {

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    Util.resizeCanvas(this.canvas);
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvas () {
    return this.canvas;
  }

  getCtx () {
    return this.ctx;
  }

}
