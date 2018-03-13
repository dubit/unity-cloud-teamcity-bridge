const { Router } = require('express');
const DependencyContainer = require('../dependencyContainer');

const buildController = DependencyContainer.resolve('buildController');

const buildRouter = new Router();

buildRouter.post('/', buildController.receiveNewBuild.bind(buildController));

module.exports = buildRouter;
