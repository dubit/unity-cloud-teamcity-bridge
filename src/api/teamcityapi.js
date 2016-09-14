import request from 'koa-request';

const teamcity_url = process.env.TEAMCITY_URL;
const teamcity_user = process.env.TEAMCITY_USER;
const teamcity_pass = process.env.TEAMCITY_PASS;

export default class TeamCityAPI {

  static createBuild(buildId, buildNumber, properties = {}) {

    properties['unityBuildNumber'] = buildNumber;

    // build properties (key value pairs) into something teamcity will understand
    let buildProperties = Object.keys(properties).map((key) => {
      // Teamcity has a special use for the % sign in build params, which can be escaped with another %
      let value = typeof properties[key] !== 'string' ? properties[key] : properties[key].replace(/%/g, '%%');

      return { 'name' : key, 'value' : value }
    });


    let payload = JSON.stringify({
      'buildType': {
        'id': buildId
      },
      'comment': {
        'text': 'Triggered by Unity Cloud Build Processor'
      },
      'properties': {
        "property": buildProperties
      }
    });

    let options = {
      auth: {
        'user': teamcity_user,
        'pass': teamcity_pass
      },
      url: `${teamcity_url}/httpAuth/app/rest/buildQueue`,
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