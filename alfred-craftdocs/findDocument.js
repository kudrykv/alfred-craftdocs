module.exports = ({conn, folderID, title}) => {
  const entries = conn.objects('BlockDataModel').filtered('blocks.@count > 0 && content == $0', title).entries();

  const items = [];

  while (true) {
    let {done, value} = entries.next();
    if (done) { break; }

    let [, bdm] = value;

    items.push({
      id: bdm.id,
      documentId: bdm.documentId
    })
  }

  if (items.length === 0) {
    return null;
  }

  const folder = conn.objects('FolderDataModel').filtered('id == $0', folderID)[0];
  if (!folder) {
    return null;
  }

  for (let block of items) {
    let doc = folder.documents.filtered('rootBlockId == $0', block.id)[0];
    if (doc) {
      return block;
    }
  }

  return null;
}