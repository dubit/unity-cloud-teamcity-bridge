import request from 'koa-request';

const teamcity_url = process.env.TEAMCITY_URL;
const teamcity_user = process.env.TEAMCITY_USER;
const teamcity_pass = process.env.TEAMCITY_PASS;

export default class TeamCityAPI {

  static createBuild(buildId, buildNumber) {
    let payload = JSON.stringify({
      'buildType': {
        'id': buildId
      },
      'comment': {
        'text': 'Triggered by Unity Cloud Build Processor'
      },
      'properties': {
        'build.number': buildNumber
      }
    });

    let options = {
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

    return request(options);
  }
}