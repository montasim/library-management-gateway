'use strict';

/**
 * @fileoverview This file sets up the Express router for authentication-related routes.
 * It includes routes for login, logout, requesting a new password, resending verification emails,
 * resetting passwords, signing up, and verifying email addresses. The routes use various middlewares
 * for validation, authentication, and handling unsupported methods.
 */

import express from 'express';

import configuration from '../../../configuration/configuration.js';

import proxyMiddleware from '../../../middleware/proxy.middleware.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';

const router = express.Router();

router
    .route('/login')
    .post(
        proxyMiddleware(
            configuration.services.authentication,
            '/login',
            '/api/v1/auth/login'
        )
    )
    .all(methodNotSupported);

router
    .route('/logout')
    .get(
        proxyMiddleware(
            configuration.services.authentication,
            '/logout',
            '/api/v1/auth/logout'
        )
    )
    .all(methodNotSupported);

router
    .route('/request-new-password')
    .put(
        proxyMiddleware(
            configuration.services.authentication,
            '/request-new-password',
            '/api/v1/auth/request-new-password'
        )
    )
    .all(methodNotSupported);

router
    .route('/resend-verification/:id')
    .post(
        proxyMiddleware(
            configuration.services.authentication,
            '/resend-verification/:id',
            '/api/v1/auth/resend-verification/:id'
        )
    )
    .all(methodNotSupported);

router
    .route('/reset-password/:token')
    .put(
        proxyMiddleware(
            configuration.services.authentication,
            '/reset-password/:token',
            '/api/v1/auth/reset-password/:token'
        )
    )
    .all(methodNotSupported);

router
    .route('/signup')
    .post(
        proxyMiddleware(
            configuration.services.authentication,
            '/signup',
            '/api/v1/auth/signup'
        )
    )
    .all(methodNotSupported);

router
    .route('/verify/:token')
    .post(
        proxyMiddleware(
            configuration.services.authentication,
            '/verify/:token',
            '/api/v1/auth/verify/:token'
        )
    )
    .all(methodNotSupported);

export default router;
