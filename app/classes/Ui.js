import _ from 'lodash';

export default class Ui {

  constructor (game) {
    this.game = game;

    /* hook event on keydown of the chat input
    this.chatSend.onkeydown = (e) => {
      if (e.keyCode === 13 && e.target.value !== '') {
        if (this.chat.childNodes.length >= 3) { this.chat.removeChild(this.chat.firstChild); }
        var li = document.createElement('li');
        li.innerText = e.target.value;
        this.chat.appendChild(li);
        e.target.value = '';
        e.target.scrollTop = e.target.scrollHeight;
      }
    };
    */

    // speed
    this.speedBar = document.createElement('div');
    this.speedBar.classList.add('ui-block--speed');
    document.body.appendChild(this.speedBar);

    // coordinates
    this.coords = document.createElement('div');
    this.coords.classList.add('ui-block--coords');
    document.body.appendChild(this.coords);
  }

  update () {

    // print the player coordinates
    this.coords.innerText = '' +
      this.game.currentPlayer.x.toFixed(0) + ' ' +
      this.game.currentPlayer.y.toFixed(0) + '';

    var colors = {
      green: { max: 70, hex: '859900' },
      yellow: { max: 110, hex: 'b58900' },
      orange: { max: 160, hex: 'cb4b16' },
      red: { hex: 'dc322f' }
    };

    // find the current color applicable to the current speed
    var currentColor = _.find(colors, (color) => {
      return color.max > this.game.currentPlayer.speed || !color.max;
    }).hex;

    // calculate the percentage of speed based on maxSpeed for the gradient
    var percent = (this.game.currentPlayer.speed / this.game.currentPlayer.maxSpeed) * 100;
    this.speedBar.style.background = 'linear-gradient(to right, #' + currentColor + ' 0%, #' + currentColor +
      ' ' + percent + '%, transparent ' + percent + '%, transparent 100%)';
  }

}
