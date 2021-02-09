module.exports = ({cfg}) => {
  let subtitle = 'A folder to place new notes';
  cfg.default_folder && (subtitle += ' (' + cfg.default_folder.name + ')');

  return [{title: 'Default folder', subtitle: subtitle, arg: 'default_folder'}];
}