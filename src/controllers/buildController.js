class BuildController {
  constructor({ logger, projectService }) {
    this.logger = logger;
    this.logger.debug('Running BuildController::constructor()...');

    this.projectService = projectService;
  }

  receiveNewBuild(req, res) {
    const {
      target,
      uuid,
      projectName,
      buildNumber,
    } = req.body;
    this.logger.info('New UnityCloud build received:');
    this.logger.info(`Project: ${projectName} | Target: ${target} | BuildNumber: ${buildNumber}`);

    res.send(501);
  }
}

module.exports = BuildController;
