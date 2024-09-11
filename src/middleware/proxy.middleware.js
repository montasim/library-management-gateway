import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';

import configuration from '../configuration/configuration.js';
import loggerService from '../service/logger.service.js';
import httpStatus from '../constant/httpStatus.constants.js';
import environment from '../constant/envTypes.constants.js';
import contentTypeConstants from '../constant/contentType.constants.js';

import getMicroserviceNameByTarget from '../utilities/getMicroserviceNameByTarget.js';

const proxyMiddleware = (
    target,
    requestedUrl,
    redirectUrl,
    microserviceName = getMicroserviceNameByTarget(target)
) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,

        // Path rewrite logic
        pathRewrite: (path, req) => {
            if (typeof redirectUrl === 'function') {
                return redirectUrl(req);
            }
            return path.replace(new RegExp(`^${requestedUrl}`), redirectUrl);
        },

        // This function intercepts the request before it's forwarded to the target
        on: {
            proxyReq: (proxyReq, req, res) => {
                loggerService.info(
                    `Proxying request: ${req.method} ${req.originalUrl}`
                );
            },

            // This function handles the response from the proxy target
            proxyRes: (proxyRes, req, res) => {
                let body = ''; // Buffer to collect response chunks

                // Collect response chunks
                proxyRes.on('data', (chunk) => {
                    body += chunk;
                });

                // After all data is received, modify or log the response
                proxyRes.on('end', async () => {
                    try {
                        if (
                            target !==
                                configuration.services
                                    .microserviceUsesTracker &&
                            req.method !== 'GET'
                        ) {
                            const parsedData = JSON.parse(body);

                            await axios.post(
                                `${configuration.services.microserviceUsesTracker}/api/v1/uses-tracker`,
                                {
                                    serviceName: microserviceName,
                                    method: req?.method,
                                    route: req?.originalUrl,
                                    status: parsedData?.status
                                        ? parsedData?.status
                                        : httpStatus.INTERNAL_SERVER_ERROR,
                                    message: parsedData?.message
                                        ? parsedData?.message
                                        : 'No message',
                                    reqBody: req?.body
                                        ? req?.body
                                        : 'No request body',
                                    responseBody: body
                                        ? body
                                        : 'No response body',
                                }
                            );
                        }

                        // Modify the response if needed
                        // const modifiedData = {
                        //     ...parsedData,
                        //     extraInfo: 'Added by proxy',
                        // };
                        // Send the modified data back to the client
                        // res.status(modifiedData.status).send(modifiedData);
                    } catch (error) {
                        loggerService.error(
                            `Error parsing response: ${error.message}`
                        );
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                            message: 'Error processing response from the proxy',
                        });
                    }
                });
            },

            // This function handles errors during proxying
            error: (error, req, res) => {
                const errorMessage =
                    configuration.env !== environment.PRODUCTION
                        ? `Proxy Error: ${error.message}`
                        : 'Internal Server Error';

                loggerService.error(`Proxy Error: ${error.message}`);

                // Send a custom error response
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, {
                    'Content-Type': contentTypeConstants.JSON,
                });

                res.end(
                    JSON.stringify({
                        error: 'Proxy error',
                        message: errorMessage,
                    })
                );
            },

            // WebSocket proxying
            proxyReqWs: (proxyReqWs, req, socket, options, head) => {
                loggerService.debug(
                    `WebSocket request proxied: ${req.originalUrl}`
                );
            },
        },
    });
};

export default proxyMiddleware;
