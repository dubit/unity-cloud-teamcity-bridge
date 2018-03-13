const { Router } = require('express');
const DependencyContainer = require('../dependencyContainer');

const healthController = DependencyContainer.resolve('healthController');

const healthRouter = new Router();

healthRouter.get('/', healthController.getServiceHealth.bind(healthController));

module.exports = healthRouter;
