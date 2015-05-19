import Camera from './Camera';
import Player from './Player';
import Block  from './Block';
import Ui     from './Ui';

export default class Game {

  constructor () {
    console.log('>>> Created a new game');

    // Map dimensions
    this.w = 3000;
    this.h = 2000;

    // Camera
    this.camera = new Camera(this);

    // User for delta time
    this.now = Date.now();

    // Players
    this.currentPlayer = new Player(this, true);
    this.players = [this.currentPlayer];

    // Obstacles
    this.blocks = [];

    // Map
    this.map = [];

    // User interface
    this.ui = new Ui(this);
  }

  eachObject (cb) {
    var allObjects = Array.prototype.concat.call([], this.players, this.blocks);
    allObjects.forEach(o => cb(o));
  }

  generateBlocks () {
    for (let i = 0; i < 100; ++i) {
      this.blocks.push(new Block({
        x: Math.floor(Math.random() * (this.w - 700)) + 300,
        y: Math.floor(Math.random() * this.h),
        w: Math.random() * 100 + 50,
        h: Math.random() * 100 + 50
      }));
    }
  }

  setMap (map) {
    this.map = map;
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell == 1) {
          this.blocks.push(new Block({
            x: x * 100,
            y: y * 100,
            w: 100,
            h: 100
          }));
        }
      })
    });
  }

  update (dt) {
    this.eachObject(o => o.update(dt));
    this.camera.update(dt);
    this.ui.update();
  }

  render () {
    this.camera.render();
  }

  loop () {

    // Calculate delta time
    var now = Date.now();
    var dt = 1 / (Date.now() - this.now);
    this.now = now;

    // Update objects
    this.update(dt);

    // Rendering game
    this.render();

    // Loop
    requestAnimationFrame(() => { this.loop(); });
  }

}
