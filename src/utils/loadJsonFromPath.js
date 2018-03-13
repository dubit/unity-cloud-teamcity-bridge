const fs = require('fs');
const path = require('path');

function loadJsonFromPath(givenPath) {
  const fullPath = path.join(process.cwd(), givenPath);
  try {
    if (!(fs.existsSync(fullPath))) {
      throw new Error('File does not exist at given path');
    }

    const fileContent = fs.readFileSync(fullPath);
    const jsonContent = JSON.parse(fileContent);
    return jsonContent;
  } catch (err) {
    /* eslint-disable no-console */
    console.error(`Couldn't load JSON from path: ${givenPath}`);
    console.error(`Resolved full path: ${fullPath}`);
    console.error(err);
    throw new Error(err);
    /* eslint-enable no-console */
  }
}

module.exports = loadJsonFromPath;
