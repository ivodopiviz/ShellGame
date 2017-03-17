'use strict';

/**
 * Static utils class for generic functionality
 */
var Utils = {
    displayWidth : 1024,
    displayHeight : 576,

    // shuffles an array in place
    shuffleArray : function(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
}

module.exports = Utils;