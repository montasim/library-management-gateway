import microserviceDatabase from '../configuration/microservice.database.js';

const getMicroserviceNameByTarget = (target) => {
    // Loop through the microservice database and find the matching URL
    const matchedService = microserviceDatabase.find(
        (service) => service.url === target
    );

    // If a match is found, return the name, otherwise return null
    return matchedService ? matchedService.name : 'unknown';
};

export default getMicroserviceNameByTarget;
