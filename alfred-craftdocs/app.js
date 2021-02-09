const search = require('./search');
const cdo = require('./cdo');
const cdoToday = require('./cdoToday');
const configEdit = require('./configEdit');
const configEditSingle = require('./configEditSingle');
const saveConfig = require('./saveConfig');

module.exports = ({conn, cfg, cmd,  spaceID, argv, todayNoteTitle}) => {
  switch (cmd) {
    case 'search':
      return search({conn, spaceID, argv})

    case 'cdo':
      return cdo({cfg});

    case 'cdo-today':
      return cdoToday({conn, spaceID, todayNoteTitle});

    case 'config-edit':
      return configEdit({cfg});

    case 'config-edit-single':
      return configEditSingle({conn, spaceID, argv});

    case 'save-config':
      return saveConfig({argv});

    default:
      return [{title: 'No results', valid: false}];
  }
};