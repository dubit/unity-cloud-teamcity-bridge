const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');
const DependencyContainer = require('../dependencyContainer');

// TODO: (Stefan) Accept configuration for the server.
function expressServerFactory() {
  const logger = DependencyContainer.resolve('logger');
  logger.info('Running expressServerFactory...');

  const server = express();

  server.disable('x-powered-by');

  server.use(bodyParser.json());
  server.use('/api/', routes);

  const port = process.env.SERVER_PORT || 3000;

  server.listen(port, () => {
    logger.info(`Express server has started on port ${port}`);
  });
}

module.exports = expressServerFactory;
