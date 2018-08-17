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

  try {
    // The primary artifact will have the value primary: true
    const primaryArtifact = this.request.body.links.artifacts.find(artifact => artifact.primary);
    const artifactURL = primaryArtifact.files[0].href;

    while (targets.length > 0) {
      let target = targets.shift();
      let response = yield teamcityapi.createBuild(target.teamcity_id, buildNumber, { remoteArtifactURL: artifactURL });

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
  } catch (err) {
    console.error(`Unity Cloud: Failed to parse packet from unity cloud webhook, the API may have changed`);
    console.error(err);
    failedBuilds++
  }

  this.body = `Builds Queued:${queuedBuilds} Failed:${failedBuilds}`;
});

app.use(router.routes());
app.listen(serverPort);

console.log(`Listening on port ${serverPort}`);