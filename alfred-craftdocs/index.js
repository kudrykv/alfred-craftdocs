const os = require('os');

let Realm;
try {
  Realm = require('realm');
} catch (e) {
  console.log(JSON.stringify({items: [{title: 'Please initialize the workflow', valid: false}]}));
  process.exit();
}

const {search} = require('./search');

const argv = process.argv.slice(2);
const spaceID = argv.shift();
const cmd = argv.shift();

const filepath = `${os.homedir()}/Library/Containers/com.lukilabs.lukiapp/Data/Library/Application Support/com.lukilabs.lukiapp/workflow_${spaceID}.realm`;
const conn = new Realm(filepath);

switch (cmd) {
  case 'search':
    console.log(JSON.stringify({items: search({conn, spaceID, argv})}));
    break;

  default:
}

conn.close();

process.exit();
