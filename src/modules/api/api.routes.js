'use strict';

/**
 * @fileoverview This module defines the main router for the application, which handles various routes for different functionalities.
 * It includes routes for authentication.
 * The router applies authentication middleware where necessary to protect routes that require user access.
 */

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './auth/auth.routes.js';
import routesConstants from '../../constant/routes.constants.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the JSDoc documentation
const docsPath = path.join(
    process.cwd(),
    'src',
    'modules',
    'api',
    'documentation',
    'code'
);

// Read the Swagger JSON from the file system
const swaggerDocument = JSON.parse(
    // fs.readFileSync('./src/modules/api/documentation/api/swagger.json', 'utf8')
    fs.readFileSync(
        path.join(__dirname, 'documentation', 'api', 'swagger.json'),
        'utf8'
    )
);

// Serve JSDoc documentation on the /api/v1/code-docs route
router.use('/documentation/code', express.static(docsPath));

// API documentation route setup
router.use(
    '/documentation/api',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Application routes
router.use(`/${routesConstants.auth.routes}`, authRoutes);

export default router;
