var PIXI = require("../dependencies/pixi.min");
var Utils = require("../base/Utils");
"use strict";

/**
 * Basic GUI class to handle UI feedback to the player
 */
var GUI = function(container) {
    var self = this;
    var wonText = new PIXI.Text("You won!");
    var lostText = new PIXI.Text("You lost!");

    this.setup = function() {
        wonText.x = Utils.displayWidth * 0.5;
        wonText.y = Utils.displayHeight * 0.5;
        wonText.visible = false;

        lostText.x = Utils.displayWidth * 0.5;
        lostText.y = Utils.displayHeight * 0.5;
        lostText.visible = false;

        container.addChild(wonText);
        container.addChild(lostText);
    };

    // simple methods to handle visibility of the GUI elements
    this.showPlayerWon = function() {
        wonText.visible = true;
        setTimeout(self.hideAll, 2000);
    };

    this.showPlayerLost = function() {
        lostText.visible = true;
        setTimeout(self.hideAll, 2000);
    };

    this.hideAll = function() {
        wonText.visible = false;
        lostText.visible = false;
    }
};

module.exports = GUI;