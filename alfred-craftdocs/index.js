const os = require('os');

let Realm;
try {
  Realm = require('realm');
} catch (e) {
  console.log(JSON.stringify({items: [{title: 'Please initialize the workflow', valid: false}]}));
  process.exit();
}

let argv = process.argv.slice(2);
let spaceID = argv.shift();

const filepath = `${os.homedir()}/Library/Containers/com.lukilabs.lukiapp/Data/Library/Application Support/com.lukilabs.lukiapp/workflow_${spaceID}.realm`;
const conn = new Realm(filepath);

const BLOCK_DATA_MODEL = 'BlockDataModel';
const DOC_DATA_MODEL = 'DocumentDataModel';

const entries = conn
  .objects(BLOCK_DATA_MODEL)
  .filtered('content contains[c] $0 limit(40)', argv.join(' '))
  .entries();

const items = [];

while (true) {
  let {done, value} = entries.next();
  if (done) { break; }

  let [, bdm] = value;

  let docRoot = conn.objects(DOC_DATA_MODEL).filtered('id = $0', bdm.documentId).entries().next().value[1];
  let titleBlock = conn.objects(BLOCK_DATA_MODEL).filtered('id = $0', docRoot.rootBlockId).entries().next().value[1];

  items.push({
    title: bdm.content || titleBlock.content,
    subtitle: titleBlock.content,
    arg: `craftdocs://open?blockId=${bdm.id}&spaceId=${spaceID}`,
  })
}

conn.close();

if (items.length === 0) {
  items.push({title: 'No results', valid: false});
}

console.log(JSON.stringify({items: items}));

process.exit();
