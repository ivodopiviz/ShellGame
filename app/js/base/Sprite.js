var PIXI = require("../dependencies/pixi.min");

'use strict';

/**
 * Simple wrapper for PIXI's Sprite class
 */
var Sprite = function(texture, x, y) {
    PIXI.Sprite.call(this, texture);
    this.x = x;
    this.y = y;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
}

Sprite.prototype = Object.create(PIXI.Sprite.prototype);

module.exports = Sprite;