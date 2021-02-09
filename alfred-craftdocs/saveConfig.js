const fs = require("fs");

module.exports = ({argv}) => {
  const change = JSON.parse(argv.shift());
  let config = {};

  if (fs.existsSync('./workflow_config.json')) {
    const buff = fs.readFileSync('./workflow_config.json')
    config = JSON.parse(buff.toString());
  }

  config = Object.assign(config, change);

  fs.writeFileSync('./workflow_config.json', JSON.stringify(config));
}
