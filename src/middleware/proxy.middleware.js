import { createProxyMiddleware } from 'http-proxy-middleware';

import configuration from '../configuration/configuration.js';
import loggerService from '../service/logger.service.js';
import environment from '../constant/envTypes.constants.js';
import httpStatus from '../constant/httpStatus.constants.js';

const proxyMiddleware = (requestedUrl) => {
    return createProxyMiddleware({
        target: configuration.services.authentication,
        changeOrigin: true,
        pathRewrite: { [`^/${requestedUrl}`]: `/api/v1/auth/${requestedUrl}` },
        onProxyReq: (proxyReq, req, res) => {
            loggerService.debug(
                `Proxying request: ${req.method} ${req.originalUrl}`
            );
        },
        onError: (error, req, res) => {
            const errorData = {
                timeStamp: new Date(),
                success: false,
                data: {},
                message:
                    configuration.env !== environment.PRODUCTION
                        ? error.message
                        : 'Internal Server Error.',
                status: httpStatus.INTERNAL_SERVER_ERROR,
            };
            loggerService.error(errorData.message);

            res.status(errorData.status).send(errorData);
        },
    });
};

export default proxyMiddleware;
