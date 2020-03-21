'use strict';

function booleanString (str) {
    if (str === 'true') {
        return true;
    } else if (str === 'false') {
        return false;
    }

    return undefined;
}
