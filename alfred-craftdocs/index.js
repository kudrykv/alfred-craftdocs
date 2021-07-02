let Realm;
let strftime;
try {
  Realm = require('realm');
  strftime = require('strftime');
} catch (e) {
  console.log(JSON.stringify({items: [{title: 'Please initialize the workflow', valid: false}]}));
  process.exit();
}

const argv = process.argv.slice(2);
const spaceID = argv.shift();
const cmd = argv.shift();
const {homedir} = require('os');
const filepath = homedir()
  + "/Library/Group Containers/group.com.lukilabs.lukiapp.share/Realms/"
  + "workflow_" + spaceID + ".realm";
const conn = new Realm(filepath);

const fs = require('fs');
const app = require('./app');
const todayNoteTitle = strftime(process.env.TODAY_PATTERN);

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
