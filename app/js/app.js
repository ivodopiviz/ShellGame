var PIXI = require("./dependencies/pixi.min");
var TweenMax = require("./dependencies/TweenMax.min");

var Utils = require("./base/Utils");
var Sprite = require("./base/Sprite");
var Board = require("./game/Board");
var GUI = require("./game/GUI");
'use strict';

/**
 * Entry point for the game
 */
var container = new PIXI.Container(), renderer = PIXI.autoDetectRenderer(Utils.displayWidth, Utils.displayHeight);
var board = new Board(container);
var gameUI = new GUI(container);

document.body.appendChild(renderer.view);

PIXI.loader
  .add("background", "./assets/images/background.png")
  .add("shell", "./assets/images/shell.png")
  .add("coin", "./assets/images/coin.png")
  .load(setup);

function setup() {
    board.setup();
    gameUI.setup();
    board.onPlayerLost = function() {
        console.log("OnPlayerLost!");
        gameUI.showPlayerLost();
        setTimeout(resetGame, 5000);
    }

    board.onPlayerWon = function() {
        console.log("OnPlayerWon!");
        gameUI.showPlayerWon();
        setTimeout(resetGame, 5000);
    }

    // start the game loop
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    // Render the stage   
    renderer.render(container);
}

function resetGame() {
    board.hideCoin();
}