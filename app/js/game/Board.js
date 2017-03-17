var PIXI = require("../dependencies/pixi.min");
var TweenMax = require('../dependencies/TweenMax.min');

var Utils = require("../base/Utils");
var Sprite = require("../base/Sprite");
"use strict";

/**
 * Board class, handles most of the game logic
 */
var Board = function(container) {
    var self = this;
    var shuffleAmount = 5;
    var shuffleCount = 0;

    this.setup = function() {
        // set up the board background
        self.background = new Sprite(PIXI.loader.resources["background"].texture,
        Utils.displayWidth * 0.5, Utils.displayHeight * 0.5);

        // set up shells
        self.shells = [
            new Sprite(PIXI.loader.resources["shell"].texture,
            Utils.displayWidth * 0.2, Utils.displayHeight * 0.25),
            new Sprite(PIXI.loader.resources["shell"].texture,
            Utils.displayWidth * 0.5, Utils.displayHeight * 0.25),
            new Sprite(PIXI.loader.resources["shell"].texture,
            Utils.displayWidth * 0.8, Utils.displayHeight * 0.25)
        ];

        // set up the coin
        self.coin = new Sprite(PIXI.loader.resources["coin"].texture,
        Utils.displayWidth * 0.5, Utils.displayHeight * 0.65);

        // add everything to the stage
        container.addChild(self.background);
        container.addChild(self.coin);
        container.addChild(self.shells[0]);
        container.addChild(self.shells[1]);
        container.addChild(self.shells[2]);

        setTimeout(self.hideCoin, 3000);
    };

    // lower all the shells to hide the coin
    this.hideCoin =  function() {
        TweenMax.to(self.shells[0], 2, {y:Utils.displayHeight * 0.65});
        TweenMax.to(self.shells[1], 2, {y:Utils.displayHeight * 0.65});
        TweenMax.to(self.shells[2], 2, {y:Utils.displayHeight * 0.65, 
            onComplete:self.shuffleShells});
    };

    // make coin visible, position it and raise the shells to show the result
    this.showCoin = function() {
        // reset the counter
        shuffleCount = 0;

        // tween all the shells upwards
        self.coin.x = self.shells[1].x;
        self.coin.y = self.shells[1].y;
        self.coin.visible = true;

        TweenMax.to(self.shells[0], 2, {y:Utils.displayHeight * 0.25});
        TweenMax.to(self.shells[1], 2, {y:Utils.displayHeight * 0.25});
        TweenMax.to(self.shells[2], 2, {y:Utils.displayHeight * 0.25});
    };

    // shuffle the shells array and animate them
    this.shuffleShells = function() {
        shuffleCount++;
        self.coin.visible = false;

        var shellsCopy = self.shells.slice();
        Utils.shuffleArray(shellsCopy);

        TweenMax.to(self.shells[0], 1, {x:shellsCopy[0].x});
        TweenMax.to(self.shells[1], 1, {x:shellsCopy[1].x});
        TweenMax.to(self.shells[2], 1, {x:shellsCopy[2].x, 
            onComplete:self.checkShuffleAmount});
    };

    // check if we're done shuffling
    this.checkShuffleAmount = function() {
        if (shuffleCount < shuffleAmount) {
            self.shuffleShells();
        } else {
            self.bindClickEvents();
        }
    };

    // make shells clickable to see if the player won
    this.bindClickEvents = function() {
        for(i=0; i<self.shells.length; i++) {
            self.shells[i].on('pointerdown', self.onShellClicked);
            self.shells[i].interactive = true;
            self.shells[i].buttonMode = true;
        }
    }

    // makes the shells not clickable
    this.disableShells = function() {
        for(i=0; i<self.shells.length; i++) {
            self.shells[i].interactive = false;
        }
    }

    // shell click event handler. checks if we won and fires callbacks
    this.onShellClicked = function(eventData) {
        self.disableShells();
        self.showCoin();
        if (eventData.target == self.shells[1])
        {
            if (self.onPlayerWon != undefined) {
                self.onPlayerWon();
            } 
        } else {
            if (self.onPlayerLost != undefined) {
                self.onPlayerLost();
            }
        }
    };
};

module.exports = Board;