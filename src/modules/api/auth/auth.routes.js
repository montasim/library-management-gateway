'use strict';

/**
 * @fileoverview This file sets up the Express router for authentication-related routes.
 * It includes routes for login, logout, requesting a new password, resending verification emails,
 * resetting passwords, signing up, and verifying email addresses. The routes use various middlewares
 * for validation, authentication, and handling unsupported methods.
 */

import express from 'express';

import proxyMiddleware from '../../../middleware/proxy.middleware.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';

const router = express.Router();

router.route('/login').post(proxyMiddleware('login')).all(methodNotSupported);

router.route('/logout').get(proxyMiddleware('logout')).all(methodNotSupported);

router
    .route('/request-new-password')
    .put(proxyMiddleware('request-new-password'))
    .all(methodNotSupported);

router
    .route('/resend-verification/:id')
    .post(proxyMiddleware('resend-verification/:id'))
    .all(methodNotSupported);

router
    .route('/reset-password/:token')
    .put(proxyMiddleware('reset-password/:token'))
    .all(methodNotSupported);

router.route('/signup').post(proxyMiddleware('signup')).all(methodNotSupported);

router
    .route('/verify/:token')
    .post(proxyMiddleware('verify/:token'))
    .all(methodNotSupported);

export default router;
