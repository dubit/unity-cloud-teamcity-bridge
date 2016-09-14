import request from 'koa-request';

const cloudKey = process.env.UNITY_ACCESS_KEY;
const cloudURL = process.env.UNITY_CLOUD_URL || 'https://build-api.cloud.unity3d.com';

export default class UnityCloudAPI {

  // With unity cloud we just do a generic get request because each request has links so we don't have to manually build URLs
  static processLink(link) {
    let options = {
      url: `${cloudURL}/${link.href}`,
      method: link.method,
      headers: {
        'Authorization' : `Basic ${cloudKey}`,
        'Accept': 'application/json',
        'User-Agent': 'request',
        'Content-Type': 'application/json'
      }
    };

    return request(options);
  }
}