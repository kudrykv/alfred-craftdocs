let Realm;
try {
  Realm = require('realm');
} catch (e) {
  console.log(JSON.stringify({items: [{title: 'Please initialize the workflow', valid: false}]}));
  process.exit();
}

const os = require('os');
const fs = require('fs');
const strftime = require('strftime');

const app = require('./app');

const argv = process.argv.slice(2);
const spaceID = argv.shift();
const cmd = argv.shift();

const todayNoteTitle = strftime(process.env.TODAY_PATTERN);

const filepath = `${os.homedir()}/Library/Containers/com.lukilabs.lukiapp/Data/Library/Application Support/com.lukilabs.lukiapp/workflow_${spaceID}.realm`;
const conn = new Realm(filepath);

let cfg = {};
if (fs.existsSync('./workflow_config.json')) {
  let buff = fs.readFileSync('./workflow_config.json');
  cfg = JSON.parse(buff.toString());
}

const resp = app({conn, cfg, spaceID, cmd, argv, todayNoteTitle});

Array.isArray(resp) && console.log(JSON.stringify({items: resp}));
typeof resp === 'string' && process.stdout.write(resp);

conn.close();

process.exit();
