import { createProxyMiddleware } from 'http-proxy-middleware';

import configuration from '../configuration/configuration.js';
import loggerService from '../service/logger.service.js';
import httpStatus from '../constant/httpStatus.constants.js';
import environment from '../constant/envTypes.constants.js';
import contentTypeConstants from '../constant/contentType.constants.js';

const proxyMiddleware = (target, requestedUrl, redirectUrl) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            // If redirectUrl is a function, call it to get the final URL
            if (typeof redirectUrl === 'function') {
                return redirectUrl(req);
            }

            // Otherwise, apply standard path rewrite
            return path.replace(new RegExp(`^${requestedUrl}`), redirectUrl);
        },

        onProxyReq: (proxyReq, req, res) => {
            loggerService.info(
                `Proxying request: ${req.method} ${req.originalUrl}`
            );
        },

        onError: (error, req, res) => {
            const errorType = error.code
                ? `Proxy Error (${error.code})`
                : 'Proxy Error';
            const errorMessage =
                configuration.env !== environment.PRODUCTION
                    ? `Error Message: ${error.message}`
                    : 'Internal Server Error.';
            const errorData = {
                timeStamp: new Date(),
                success: false,
                data: {},
                message: errorMessage,
                status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
            };

            loggerService.error(`${errorType}: ${errorMessage}`);

            res.status(errorData.status).send(errorData);
        },

        onProxyRes: (proxyRes, req, res) => {
            if (proxyRes.statusCode !== httpStatus.OK) {
                loggerService.warn(
                    `Received ${proxyRes.statusCode} from ${req.originalUrl}`
                );
            }
        },

        onProxyReqWs: (proxyReqWs, req, socket, options, head) => {
            loggerService.debug(
                `Websocket request proxied: ${req.originalUrl}`
            );
        },

        onProxyError: (err, req, res) => {
            const errorMsg =
                configuration.env !== environment.PRODUCTION
                    ? `Websocket error: ${err.message}`
                    : 'A websocket error occurred.';

            loggerService.error(errorMsg);

            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, {
                'Content-Type': contentTypeConstants.JSON,
            });
            res.end(
                JSON.stringify({ error: 'Proxy error', message: errorMsg })
            );
        },
    });
};

export default proxyMiddleware;
