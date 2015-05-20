import _ from 'lodash';
import Util from './Util';
import Geometry from './Geometry';

export default class Player {

  constructor (game, isPlayer) {
    console.log('>>> Created a new player');
    this.game = game;
    this.hp = 100;
    this.x = 1450;
    this.y = 500;
    this.color = 'red';
    this.size = 30;
    this.rotation = 0;
    this.rotationV = 0;
    this.maxSpeed = 150;
    this.speed = 0;
    this.speedV = 0;
    this.isPlayer = !!isPlayer;

    if (this.isPlayer) {
      this.addKeyboardsEvents();
    }
  }

  addKeyboardsEvents () {

    let keyMap = {
      // Up
      38: [
        function () { this.speedV = 1; },
        function () { this.speedV = -1; }
      ],
      // Down
      40: [
        _.noop,
        _.noop
      ],
      // Right
      39: [
        function () { this.rotationV = 1; },
        function () { this.rotationV = 0; }
      ],
      // Left
      37: [
        function () { this.rotationV = -1; },
        function () { this.rotationV = 0; }
      ]
    };

    document.onkeydown = _.throttle((e) => {
      (keyMap[e.keyCode] || [_.noop, _.noop])[0].apply(this);
    }, 10);

    document.onkeyup = _.throttle((e) => {
      (keyMap[e.keyCode] || [_.noop, _.noop])[1].apply(this);
    }, 10);
  }

  update (dt) {

    // calc rotation
    this.rotation = (this.rotation + this.rotationV * 0.1) % (Math.PI * 2);

    // calc speed
    this.speed += this.speedV * 5;
    (this.speed > this.maxSpeed) && (this.speed = this.maxSpeed);
    (this.speed < 0) && (this.speed = 0);

    // fix for 1rst frame
    if (dt === Infinity) { dt = 0; }

    // update pos
    var last = { x: this.x, y: this.y };
    this.x += (Math.cos(this.rotation - Math.PI / 2) * this.speed) * dt;
    this.y += (Math.sin(this.rotation - Math.PI / 2) * this.speed) * dt;

    // check collisions
    this.game.blocks.forEach(b => {
      if (b.contains(this)) {
        (last.x < b.x) && (this.x = last.x);
        (last.y < b.y) && (this.y = last.y);
        (last.x > b.x + b.w) && (this.x = last.x);
        (last.y > b.y + b.h) && (this.y = last.y);
      }
    });

    // dont go outside the map
    (this.x < 1) && (this.x = 1);
    (this.y < 1) && (this.y = 1);
    (this.x > this.game.w - 1) && (this.x = this.game.w - 1);
    (this.y > this.game.h - 1) && (this.y = this.game.h - 1);
  }

  drawShip (ctx, origin) {
    ctx.save();
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.translate(origin.x, origin.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();

    ctx.moveTo(0, -this.size / 2);
    ctx.lineTo(this.size / 2, this.size / 2);
    ctx.lineTo(-this.size / 2, this.size / 2);

    ctx.fill();
    ctx.restore();
  }

  drawHalo (ctx, relative) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 255, 255, 1)';

    var intersects = Geometry.getSightPolygon(this.x, this.y, this.game.points, this.game.segments);
    Geometry.drawPolygon(ctx, relative, intersects, '#827F2B');

    ctx.restore();
  }

  render (ctx, relative) {

    var coords = {
      x: this.x - relative.x,
      y: this.y - relative.y
    };

    // drawing vision halo
    if (this.isPlayer) {
      this.drawHalo(ctx, relative);
    }

    // drawing ship
    this.drawShip(ctx, coords);

  }

}
