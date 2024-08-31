'use strict';

import loggerService from '../service/logger.service.js';

import asyncErrorHandlerService from '../utilities/asyncErrorHandler.js';

// TODO: Implement the `controller` log
// TODO: utilize the hostData for every controller

const getList = (service, getListFunction) =>
    asyncErrorHandlerService(async (req, res) => {
        // Determine the query to pass based on the presence of `requester`.
        const query = [req.query];

        // Call the service function with the appropriate query.
        const dataList = getListFunction
            ? await service[getListFunction](...query)
            : await service(...query);

        loggerService.info(`Entity list retrieved for ${req.originalUrl}`);

        dataList.route = req.originalUrl;
        res.status(dataList.status).send(dataList);
    });

const controller = {
    getList,
};

export default controller;
