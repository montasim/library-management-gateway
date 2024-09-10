'use strict';

/**
 * @fileoverview This module defines the main router for the application, which handles various routes for different functionalities.
 * It includes routes for authentication.
 * The router applies authentication middleware where necessary to protect routes that require user access.
 */

import express from 'express';

import routesConstants from '../../constant/routes.constants.js';
import authRoutes from './auth/auth.routes.js';
import configuration from '../../configuration/configuration.js';

import proxyMiddleware from '../../middleware/proxy.middleware.js';
import methodNotSupported from '../../shared/methodNotSupported.js';

const router = express.Router();

// Application routes
router.use(`/${routesConstants.auth.routes}`, authRoutes);

// URL Shortener routes
router
    .route(`/${routesConstants.urlShortener.routes}`)
    .post(
        proxyMiddleware(
            configuration.services.urlShortener,
            '/url-shortener',
            '/api/v1/url-shortener'
        )
    )
    .get(
        proxyMiddleware(
            configuration.services.urlShortener,
            '/url-shortener',
            '/api/v1/url-shortener'
        )
    )
    .all(methodNotSupported);

// URL Shortener route with shortId parameter
router
    .route(`/${routesConstants.urlShortener.routes}/:shortId`)
    .get(
        proxyMiddleware(
            configuration.services.urlShortener,
            `/${routesConstants.urlShortener.routes}/:shortId`, // Updated the requested URL pattern
            (req) => `/api/v1/url-shortener/${req.params.shortId}` // Target path includes the dynamic shortId
        )
    )
    .all(methodNotSupported);

router
    .route(`/${routesConstants.sendEmail.routes}`)
    .post(
        proxyMiddleware(
            configuration.services.sendEmail,
            '/send-email',
            '/api/v1/send-email'
        )
    )
    .all(methodNotSupported);

export default router;
