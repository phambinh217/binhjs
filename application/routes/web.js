'use strict';

let express = require('express');
let router = express.Router();

// controllers
let homeController = require('@application/controllers/http/web/homeController');

// middlewares
let webMiddilewares = require('@application/middlewares').web;

// Common web middleware
router.use('/', webMiddilewares);

// routers
router.get('/', homeController.index);

router.get('/week-up', function (req, res) {
    return res.json(1);
});

module.exports = router;
