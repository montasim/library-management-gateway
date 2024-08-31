'use strict';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import helmetConfiguration from './configuration/helmet.configuration.js';
import corsConfiguration from './configuration/cors.configuration.js';
import compressionConfiguration from './configuration/compression.configuration.js';
import morganConfiguration from './configuration/morgan.configuration.js';
import appRoutes from './routes.js';

import sanitizeRequestConfiguration from './configuration/sanitizeRequest.configuration.js';
import errorHandlingService from './service/errorHandling.service.js';
import hppConfiguration from './configuration/hpp.configuration.js';

const app = express();

// Security middleware
app.use(helmet(helmetConfiguration));
app.use(cors(corsConfiguration));
app.use(hppConfiguration());
app.use(compressionConfiguration);

// Morgan HTTP requestBooks loggerService setup
app.use(morganConfiguration);

// Sanitize requestBooks data
app.use(sanitizeRequestConfiguration);

// Routes
app.use('/', appRoutes);

// Error handling middleware
app.use(errorHandlingService);

export default app;
