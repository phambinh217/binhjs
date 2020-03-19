'use strict';

const express = require('express');
const router = express.Router();

// controllers
const homeController = require('@/app/controllers/http/web/homeController');

// middlewares
const webMiddilewares = require('@/app/middlewares').web;

// Common web middleware
router.use('/', webMiddilewares);

// routers
router.get('/', function (req, res) {
    res.error404();
});

router.get('/week-up', function (req, res) {
    return res.json(1);
});

module.exports = router;
