const loadJsonFromPath = require('../utils/loadJsonFromPath');

class ProjectService {
  constructor({ logger }) {
    this.logger = logger;
    this.logger.debug('Running ProjectService::contructor()...');
    this.projectsJsonPath = process.env.PROJECTS_JSON_PATH || './config/projects.json';
    this.projectsJson = loadJsonFromPath(this.projectsJsonPath);
  }
}

module.exports = ProjectService;
