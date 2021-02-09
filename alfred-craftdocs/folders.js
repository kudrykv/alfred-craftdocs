module.exports = ({conn, argv}) => {
  const entries = conn.objects('FolderDataModel')
    .filtered('name contains[c] $0 limit(40)', argv.join(' '))
    .entries();

  const items = [];

  while (true) {
    let {done, value} = entries.next();
    if (done) { break; }

    let [, fdm] = value;

    items.push({
      title: fdm.name,
      arg: JSON.stringify({default_folder: {id: fdm.id, name: fdm.name}}),
      autocomplete: fdm.name
    })
  }

  if (items.length === 0) {
    items.push({title: 'No results', valid: false});
  }

  return items;
};
