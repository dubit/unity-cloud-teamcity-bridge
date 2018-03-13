const { Router } = require('express');
const healthRouter = require('../routes/health');

const rootRouter = new Router();

rootRouter.use('/health', healthRouter);

module.exports = rootRouter;
