'use strict';

import loggerService from '../service/logger.service.js';

import initiateGracefulShutdown from './initiateGracefulShutdown.js';

/**
 * Handles operating system signals for server shutdown, ensuring all critical services
 * like database connections are properly closed before the server shuts down. This function
 * is key in maintaining application integrity and consistency when the server is asked to
 * terminate, either by OS signals or manually by the user. It attempts to gracefully shut down
 * the server and logs any errors that occur during this process.
 *
 * @async
 * @function shutdownHandler
 * @param {string} signal The signal received that initiates the shutdown (e.g., 'SIGINT', 'SIGTERM').
 * @param {Object} server The server instance to be shut down.
 * @description Manages the graceful shutdown of the server in response to received signals.
 */
const shutdownHandler = async (signal, server) => {
    loggerService.log(`Received ${signal}.`);

    try {
        await initiateGracefulShutdown(signal, server);
    } catch (shutdownError) {
        loggerService.error(
            `Error during graceful shutdown on ${signal}: ${shutdownError.message}`
        );

        process.exit(1);
    }
};

export default shutdownHandler;
