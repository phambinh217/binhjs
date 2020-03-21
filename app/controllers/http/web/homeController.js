'use strict';

function index (req, res) {
    return res.render('web/welcome');
}

module.exports = {
    index,
}
