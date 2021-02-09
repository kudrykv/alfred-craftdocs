const fs = require("fs");
const findDocument = require('./findDocument');

module.exports = ({conn, spaceID, todayNoteTitle}) => {
  if (!fs.existsSync('./workflow_config.json')) {
    return [{title: 'Please define the default folder first', valid: false}];
  }

  const buff = fs.readFileSync('./workflow_config.json')
  const cfg = JSON.parse(buff.toString());

  if (!cfg.default_folder) {
    return [{title: 'Please define the default folder first', valid: false}];
  }

  const block = findDocument({conn, folderID: cfg.default_folder.id, title: todayNoteTitle});

  return block
    ? `craftdocs://open?blockId=${block.id}&spaceId=${spaceID}`
    : `craftdocs://x-callback-url/createdocument?spaceId=${spaceID}&folderId=${cfg.default_folder.id}&title=${todayNoteTitle}&content=`
}
