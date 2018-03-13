class HealthController {
  constructor({ logger }) {
    this.logger = logger;
  }

  getServiceHealth(req, res) {
    this.logger.debug('Health check endpoint called...');
    res.json({ ok: true });
  }
}

module.exports = HealthController;
