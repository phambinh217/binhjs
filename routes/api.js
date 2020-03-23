'use strict';

const express = require('express');
const router = express.Router();

// controllers
const authController = require('@/app/controllers/http/api/authController');
const meController = require('@/app/controllers/http/api/meController');
const productController = require('@/app/controllers/http/api/productController');
const collectionController = require('@/app/controllers/http/api/collectionController');
const bannerController = require('@/app/controllers/http/api/bannerController');

// middlewares
const apiMiddilewares = require('@/app/middlewares').api;
const requiredAuthenticate = require('@/app/middlewares/requiredAuthenticate');

// requests
const registerRequest = require('@/app/requests/api/auth/registerRequest');
const loginRequest = require('@/app/requests/api/auth/loginRequest');
const refreshAccessTokenRequest = require('@/app/requests/api/auth/refreshAccessTokenRequest');
const getDetailProductRequest = require('@/app/requests/api/product/getDetailProductRequest');

router.use('/', [ apiMiddilewares ]);

// Routers without auth
router.post('/auth/login', [loginRequest], authController.login);
router.post('/auth/register', [registerRequest], authController.register);

router.get('/products', productController.getListProduct);
router.get('/products/:uniqueId', [ getDetailProductRequest ], productController.getDetailProduct);
router.get('/collections', collectionController.getAllCollections);
router.get('/banners', bannerController.getAllBanners);

// Common middleware
router.use('/', [ requiredAuthenticate ]);

// Routers with auth
router.delete('/auth/logout', authController.logout);
router.post('/auth/refresh', [ refreshAccessTokenRequest ], authController.refreshAccessToken);
router.get('/me', meController.showInfo);

module.exports = router;
