import path from 'path';
import koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser'

import projectConfig from './projectconfig';
import teamcityapi from './api/teamcityapi';
import unitycloudapi from './api/unitycloudapi';

const serverPort = process.env.PORT || 8080;
const configPath = process.env.PROJECT_CONFIG_PATH || './config/projects.json';

const app = koa();
const router = koaRouter();
const projects = projectConfig.load(configPath);

app.use(bodyParser());

// Routes
router.post('/build', function*(next) {
  let {
    buildTargetName: target,
    projectGuid: uuid,
    projectName,
    buildNumber
  } = this.request.body;

  console.info(`Unity Cloud: Build Recieved`);
  console.info(`Project: ${projectName} target: ${target}`);

  let targets = projects.find(uuid, target);
  let queuedBuilds = 0;
  let failedBuilds = 0;

  // attempt to find the artifact for this project
  let buildData = yield unitycloudapi.processLink(this.request.body.links.api_self);
  let buildProperties = { unityCloudArtifactUrl: JSON.parse(buildData.body).links.download_primary.href };

  while (targets.length > 0) {
    let target = targets.shift();
    let response = yield teamcityapi.createBuild(target.teamcity_id, buildNumber, buildProperties);

    // Todo move this into the teamcity-api to handle
    if (response.statusCode < 200 || response.statusCode >= 400) {
      failedBuilds++;
      console.error(`Team City: Responded with Error ${response.statusCode} ${response.statusMessage}`);
      console.error(response.body);
    } else {
      queuedBuilds++;

      let buildDetails = JSON.parse(response.body).buildType;
      console.log(`Team City: Build ${buildDetails.projectName} , ${buildDetails.name} #${buildNumber} queued`);
    }
  }

  this.body = `Builds Queued:${queuedBuilds} Failed:${failedBuilds}`;
});

app.use(router.routes());
app.listen(serverPort);

console.log(`Listening on port ${serverPort}`);