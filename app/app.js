// Styles
require('../styles/app.css');

// Dependencies
import _ from 'lodash';

// Classes
import Util from './classes/Util';

// Core
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var mouse = { x: 0, y: 0 };

document.body.appendChild(canvas);

window.addEventListener('resize', _.debounce(_.bind(Util.resizeCanvas, null, canvas), 100));
document.addEventListener('mousemove', function (e) {
  mouse.x = e.clientX || e.pageX;
  mouse.y = e.clientY || e.pageY;
});

Util.resizeCanvas(canvas);

var x = 0;
var y = 0;

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  x += (mouse.x - x - 25) * 0.1;
  y += (mouse.y - y - 25) * 0.1;
  ctx.beginPath();
  ctx.rect(x, y, 50, 50);
  ctx.fillStyle = '#eee';
  ctx.fill();
  requestAnimationFrame(draw);
}

draw();
