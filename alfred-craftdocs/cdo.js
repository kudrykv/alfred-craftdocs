module.exports = ({cfg, todayNoteTitle}) => {
  let item = {
    title: 'today - create a note for today',
    subtitle: 'Setup the default folder first',
    arg: 'cdo-today',
    valid: false,
  };

  if (cfg.default_folder) {
    item = Object.assign(item, {
      subtitle: 'Jump to or create ' + todayNoteTitle + ' note in ' + cfg.default_folder.name,
      valid: true
    })
  }

  return [item];
}
