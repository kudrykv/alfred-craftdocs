let Realm;
try {
  Realm = require('realm');
} catch (e) {
  console.log(JSON.stringify({items: [{title: 'Please initialize the workflow', valid: false}]}));
  process.exit();
}

const os = require('os');
const fs = require('fs');
const dateformat = require('dateformat');

const search = require('./search');
const folders = require('./folders');
const findDocument = require('./findDocument');

const argv = process.argv.slice(2);
const spaceID = argv.shift();
const cmd = argv.shift();

const todayNoteTitle = dateformat(new Date(), process.env.TODAY_PATTERN);

const filepath = `${os.homedir()}/Library/Containers/com.lukilabs.lukiapp/Data/Library/Application Support/com.lukilabs.lukiapp/workflow_${spaceID}.realm`;
const conn = new Realm(filepath);

let items;
let listFilter = true;

let workflowCfg = {};
if (fs.existsSync('./workflow_config.json')) {
  let buff = fs.readFileSync('./workflow_config.json');
  workflowCfg = JSON.parse(buff.toString());
}

switch (cmd) {
  case 'search':
    items = search({conn, spaceID, argv})
    break;

  case 'cdo':
    items = [{title: 'today', subtitle: 'Jump to or create note ' + todayNoteTitle, arg: 'today'}];
    break;

  case 'config-select':
    items = [{title: 'Default folder', subtitle: 'A folder to place new notes', arg: 'default_folder'}];
    break;

  case 'config':
    switch (argv.shift()) {
      case 'default_folder':
        items = folders({conn, spaceID, argv});
        break;

      default:
        break;
    }

    break;

  case 'save-config':
    const change = JSON.parse(argv.shift());
    let config = {};

    if (fs.existsSync('./workflow_config.json')) {
      const buff = fs.readFileSync('./workflow_config.json')
      config = JSON.parse(buff.toString());
    }

    config = Object.assign(config, change);

    fs.writeFileSync('./workflow_config.json', JSON.stringify(config));

    break;

  case 'today':
    listFilter = false;

    if (!fs.existsSync('./workflow_config.json')) {
      items = [{title: 'Please define the default folder first', valid: false}];
      break;
    }

    const buff = fs.readFileSync('./workflow_config.json')
    const cfg = JSON.parse(buff.toString());

    if (!cfg.default_folder) {
      items = [{title: 'Please define the default folder first', valid: false}];
      break;
    }

    const block = findDocument({conn, folderID: cfg.default_folder.id, title: todayNoteTitle});

    if (!block) {
      process.stdout.write(`craftdocs://x-callback-url/createdocument?spaceId=${spaceID}&folderId=${cfg.default_folder.id}&title=${todayNoteTitle}&content=`);
    } else {
      process.stdout.write(`craftdocs://open?blockId=${block.id}&spaceId=${spaceID}`);
    }

    break;

  case 'test':
    let buff2 = fs.readFileSync('./workflow_config.json')
    let cfg2 = JSON.parse(buff2.toString());
    console.log(findDocument({conn, folderID: cfg2.default_folder}));
    break;

  default:
    items = [{title: 'No results', valid: false}];
}

listFilter && console.log(JSON.stringify({items: items}));

conn.close();

process.exit();
