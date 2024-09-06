'use strict';

import express from 'express';

import configuration from '../../../configuration/configuration.js';

import proxyMiddleware from '../../../middleware/proxy.middleware.js';
import methodNotSupported from '../../../shared/methodNotSupported.js';

const router = express.Router();

router
    .route('/')
    .post(
        proxyMiddleware(
            configuration.services.urlShortener,
            '/url-shortener',
            '/api/v1/'
        )
    )
    .get(
        proxyMiddleware(
            configuration.services.urlShortener,
            '/url-shortener',
            '/api/v1/'
        )
    )
    .all(methodNotSupported);

router
    .route('/:shortId')
    .get(
        proxyMiddleware(
            configuration.services.urlShortener,
            '/url-shortener/:shortId',
            '/api/v1/:shortId'
        )
    )
    .all(methodNotSupported);

export default router;
