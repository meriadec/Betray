import _ from 'lodash';
import Util from './Util';
import Graphic from './Graphic';

export default class Camera {

  constructor (game) {
    console.log('>>> Created a new camera');
    this.game = game;
    this.graphic = new Graphic();
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.x = 0;
    this.y = 0;
    this.xV = 0;
    this.yV = 0;

    window.addEventListener('resize', _.debounce(() => {
      this.resize();
    }, 100));
  }

  resize () {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    Util.resizeCanvas(this.graphic.getCanvas());
  }

  contains (o) {
    return (o.x >= this.x - 200 && o.x <= this.x + this.w + 200 && o.y >= this.y - 200 && o.y <= this.y + this.h + 200);
  }

  getCenter () {
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2
    };
  }

  update (dt) {

    // get current player pos
    var p = this.game.currentPlayer;

    // calculate camera center
    var center = this.getCenter();

    // update x and y velocity
    var xDiff = p.x - center.x;
    var yDiff = p.y - center.y;

    // update x and y according to corresponding velocities
    this.x += xDiff * dt * 2;
    this.y += yDiff * dt * 2;

    // dont go outside map
    (this.x < 0) && (this.x = 0);
    (this.y < 0) && (this.y = 0);
    (this.x + this.w > this.game.w) && (this.x = this.game.w - this.w);
    (this.y + this.h > this.game.h) && (this.y = this.game.h - this.h);
  }

  drawGrid () {
    var ctx = this.graphic.getCtx();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeWidth = 1;
    for (let x = -(this.x % 50); x < this.w; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.h);
      ctx.stroke();
    }
    for (let y = -(this.y % 50); y < this.h; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.w, y);
      ctx.stroke();
    }
  }

  drawEnemies (ctx, point) {
    this.game.enemies.forEach(e => { if (this.contains(e)) { e.render(ctx, point); } });
  }

  render () {

    var ctx = this.graphic.getCtx();
    var point = { x: this.x, y: this.y };

    // clear all
    this.graphic.clear();

    this.game.currentPlayer.render(ctx, point);

    ctx.globalCompositeOperation = 'source-atop';

    // draw enemies
    this.drawEnemies(ctx, point);
    ctx.globalCompositeOperation = 'source-over';

    // draw a nice grid
    this.drawGrid();

    this.game.blocks.forEach(b => { if (this.contains(b)) { b.render(ctx, point); } });

  }

}
