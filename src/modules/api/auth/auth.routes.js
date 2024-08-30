'use strict';

/**
 * @fileoverview This file sets up the Express router for authentication-related routes.
 * It includes routes for login, logout, requesting a new password, resending verification emails,
 * resetting passwords, signing up, and verifying email addresses. The routes use various middlewares
 * for validation, authentication, and handling unsupported methods.
 */

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import methodNotSupported from '../../../shared/methodNotSupported.js';

const router = express.Router();

router
    .route('/login')
    .post(createProxyMiddleware({
        target: 'http://localhost:3000', // Target server
        changeOrigin: true,
        pathRewrite: { '^/login': '/api/v1/auth/login' }, // Adjust path if needed
        onProxyReq: (proxyReq, req, res) => {
            // Log or modify the request if necessary
            console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
            // You can also modify the request here if needed
            // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error' });
        },
    }))
    .all(methodNotSupported);

router
    .route('/logout')
    .get(createProxyMiddleware({
            target: 'http://localhost:3000', // Target server
            changeOrigin: true,
            pathRewrite: { '^/logout': '/api/v1/auth/logout' }, // Adjust path if needed
            onProxyReq: (proxyReq, req, res) => {
                // Log or modify the request if necessary
                console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
                // You can also modify the request here if needed
                // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err);
                res.status(500).json({ error: 'Proxy error' });
            },
        })
    )
    .all(methodNotSupported);

router
    .route('/request-new-password')
    .put(createProxyMiddleware({
        target: 'http://localhost:3000', // Target server
        changeOrigin: true,
        pathRewrite: { '^/request-new-password': '/api/v1/auth/request-new-password' }, // Adjust path if needed
        onProxyReq: (proxyReq, req, res) => {
            // Log or modify the request if necessary
            console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
            // You can also modify the request here if needed
            // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error' });
        },
    }))
    .all(methodNotSupported);

router
    .route('/resend-verification/:id')
    .post(createProxyMiddleware({
        target: 'http://localhost:3000', // Target server
        changeOrigin: true,
        pathRewrite: { '^/resend-verification/:id': '/api/v1/auth/resend-verification/:id' }, // Adjust path if needed
        onProxyReq: (proxyReq, req, res) => {
            // Log or modify the request if necessary
            console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
            // You can also modify the request here if needed
            // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error' });
        },
    }))
    .all(methodNotSupported);

router
    .route('/reset-password/:token')
    .put(createProxyMiddleware({
        target: 'http://localhost:3000', // Target server
        changeOrigin: true,
        pathRewrite: { '^/reset-password/:token': '/api/v1/auth/reset-password/:token' },
        onProxyReq: (proxyReq, req, res) => {
            // Log or modify the request if necessary
            console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
            // You can also modify the request here if needed
            // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error' });
        },
    }))
    .all(methodNotSupported);

router
    .route('/signup')
    .post(createProxyMiddleware({
        target: 'http://localhost:3000', // Target server
        changeOrigin: true,
        pathRewrite: { '^/signup': '/api/v1/auth/signup' }, // Adjust path if needed
        onProxyReq: (proxyReq, req, res) => {
            // Log or modify the request if necessary
            console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
            // You can also modify the request here if needed
            // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error' });
        },
    }))
    .all(methodNotSupported);

router
    .route('/verify/:token')
    .post(createProxyMiddleware({
        target: 'http://localhost:3000', // Target server
        changeOrigin: true,
        pathRewrite: { '^/verify/:token': '/api/v1/auth/verify/:token' }, // Adjust path if needed
        onProxyReq: (proxyReq, req, res) => {
            // Log or modify the request if necessary
            console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
            // You can also modify the request here if needed
            // Example: proxyReq.setHeader('Authorization', 'Bearer your-token');
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy error' });
        },
    }))
    .all(methodNotSupported);

export default router;
