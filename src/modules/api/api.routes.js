'use strict';

/**
 * @fileoverview This module defines the main router for the application, which handles various routes for different functionalities.
 * It includes routes for authentication.
 * The router applies authentication middleware where necessary to protect routes that require user access.
 */

import express from 'express';

import authRoutes from './auth/auth.routes.js';
import routesConstants from '../../constant/routes.constants.js';

const router = express.Router();

// Application routes
router.use(`/${routesConstants.auth.routes}`, authRoutes);

export default router;
