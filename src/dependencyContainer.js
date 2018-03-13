const path = require('path');
const awilix = require('awilix');
const loggerFactory = require('./factories/loggerFactory');

class DependencyContainer {
  constructor() {
    this.container = awilix.createContainer();

    this.container.register({
      logger: awilix.asFunction(loggerFactory).singleton(),
    });

    this.container.loadModules(
      [
        'controllers/**/*.js',
        'services/**/*.js',
      ],
      {
        formatName: 'camelCase',
        cwd: path.join(process.cwd(), 'src'),
        resolverOptions: {
          lifetime: awilix.Lifetime.SINGLETON,
          register: awilix.asClass,
        },
      },
    );
  }
}

module.exports = new DependencyContainer().container;
