import path from 'path';
import koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser'
import request from 'koa-request';

// Configuration
const teamcity_url = process.env.TEAMCITY_URL;
const teamcity_user = process.env.TEAMCITY_USER;
const teamcity_pass = process.env.TEAMCITY_PASS;
const serverPort = process.env.PORT || 8080;

const app = koa();
const router = koaRouter();

app.use(bodyParser());

// Routes
router.post('/build', function*(next) {
    let data = this.request.body;
    this.body = data;

    var payload = JSON.stringify({
      'buildType': {
        'id': 'insert_build_id'
      }
    });

    var options = {
      auth: {
        'user': teamcity_user,
        'pass': teamcity_pass
      },
      url: teamcity_url,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'request',
        'Content-Type': 'application/json'
      },
      body: payload
    };

    var response = yield request(options);

    console.log(response.body);
    this.body = response.body;
  });

app.use(router.routes());
app.listen(serverPort);

console.log(`Listening on port ${serverPort}`);