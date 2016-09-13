import path from 'path';
import koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser'

import teamcityapi from './api/teamcityapi';

const serverPort = process.env.PORT || 8080;

const app = koa();
const router = koaRouter();

app.use(bodyParser());

// Routes
router.post('/build', function* (next) {
  let response = yield teamcityapi.createBuild('build_id');

  this.body = response.body;
});

app.use(router.routes());
app.listen(serverPort);

console.log(`Listening on port ${serverPort}`);