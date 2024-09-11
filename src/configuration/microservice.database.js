import configuration from './configuration.js';

const microserviceDatabase = [
    {
        name: 'authentication-microservice',
        url: configuration.services.authentication,
    },
    {
        name: 'url-shortener-microservice',
        url: configuration.services.urlShortener,
    },
    {
        name: 'send-email-microservice',
        url: configuration.services.sendEmail,
    },
    {
        name: 'microservice-uses-tracker',
        url: configuration.services.microserviceUsesTracker,
    },
];

export default microserviceDatabase;
