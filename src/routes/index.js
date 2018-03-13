const { Router } = require('express');
const healthRouter = require('../routes/health');
const buildRouter = require('../routes/build');

const rootRouter = new Router();

rootRouter.use('/health', healthRouter);
rootRouter.use('/build', buildRouter);

module.exports = rootRouter;
