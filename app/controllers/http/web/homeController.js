'use strict';

const index = function (req, res) {
    return res.render('web/welcome');
}

module.exports = {
    index,
}
