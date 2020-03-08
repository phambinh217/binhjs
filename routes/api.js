'use strict';

let express = require('express');
let router = express.Router();

// controllers
let authController = require('@/app/controllers/http/api/authController');
let meController = require('@/app/controllers/http/api/meController');

// middlewares
let apiMiddilewares = require('@/app/middlewares').api;
let requiredAuthenticate = require('@/app/middlewares/requiredAuthenticate');

// requests
let registerRequest = require('@/app/requests/api/auth/registerRequest');
let loginRequest = require('@/app/requests/api/auth/loginRequest');
let refreshAccessTokenRequest = require('@/app/requests/api/auth/refreshAccessTokenRequest');

// Routers without auth
router.post('/auth/login', [loginRequest], authController.login);
router.post('/auth/register', [registerRequest], authController.register);

// Common middleware
router.use('/', [ apiMiddilewares, requiredAuthenticate ]);

// Routers with auth
router.delete('/auth/logout', authController.logout);
router.post('/auth/refresh', [ refreshAccessTokenRequest ], authController.refreshAccessToken);
router.get('/me', meController.showInfo);

module.exports = router;
