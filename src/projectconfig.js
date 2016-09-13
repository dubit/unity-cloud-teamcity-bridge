import fs from 'fs';

export default class ProjectConfig {
  static load(path) {
    console.log(`loading project config from ${path}`);

    let config = new ProjectConfig();

    fs.readFile(path, (err, data) => {
      if (err) {
        console.error(`Error loading config - Check '${path}' exists and is accesible`);      
        throw err;
      }

      config.data = JSON.parse(data);
    });

    return config;
  }

  find(uuid, target) {
    return this.data.filter((item) => {
      return item.uuid === uuid && item.targetName === target;
    });
  }
}