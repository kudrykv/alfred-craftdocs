const folders = require('./folders');

module.exports = ({conn, spaceID, argv}) => {
  switch (argv.shift()) {
    case 'default_folder':
      return folders({conn, spaceID, argv});

    default:
      return [{title: 'No results', valid: false}];
  }
}