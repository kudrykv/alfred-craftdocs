const BLOCK_DATA_MODEL = 'BlockDataModel';
const DOC_DATA_MODEL = 'DocumentDataModel';

module.exports = ({conn, spaceID, argv}) => {
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
      uid: bdm.id,
      title: bdm.content || titleBlock.content,
      subtitle: titleBlock.content,
      arg: `craftdocs://open?blockId=${bdm.id}&spaceId=${spaceID}`,
    })
  }

  if (items.length === 0) {
    items.push({title: 'No results', valid: false});
  }

  return items;
}
