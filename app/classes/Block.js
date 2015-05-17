import _ from 'lodash';

export default class Block {

  constructor (props) {
    _.extend(this, props);
  }

  contains (o) {
    return (o.x > this.x && o.x < this.x + this.w && o.y > this.y && o.y < this.y + this.h);
  }

  update () {
  }

  render (ctx, relative) {

    var coords = {
      x: this.x - relative.x,
      y: this.y - relative.y
    };

    ctx.fillStyle = 'rgba(80, 80, 80, 1)';
    ctx.fillRect(coords.x, coords.y, this.w, this.h);
  }

}
