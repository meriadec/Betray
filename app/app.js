// Styles
require('../styles/app.css');

// Dependencies
require('gsap');

// Classes
import Game from './classes/Game';

var game = new Game();

game.generateBlocks();

game.loop();
