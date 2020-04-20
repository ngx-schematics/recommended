const path = require('path');
const fs = require('fs');

const GROUP_SIZE = 10;

function applyToGroups(groupSize, groupCallback) {
  return (files) => {
    const fileGroups = [];
    files = files.map(file => path.relative(process.cwd(), file));
    files = files.filter( fs.existsSync );
    while (files.length) {
      fileGroups.push(files.splice(0, Math.min(files.length, groupSize)));
    }

    return fileGroups.map(groupCallback)
      .reduce((commands, groupCommands) => [...commands, ...groupCommands], []);
  };
}

module.exports = {
  'src/**/*.ts': [
    applyToGroups(GROUP_SIZE, groupFiles => [
      `ng lint portal-widgets --fix --files ${groupFiles.join(' --files ')}`,
      `prettier --write ${groupFiles.join(' ')}`    
    ]),
    'git add'
  ],
  'src/**/*.html': [
    'prettier --write',
    'git add'
  ],
  'src/**/*.json': [
    applyToGroups(1, groupFiles => [
      `jsonlint --quiet --compact ${groupFiles.join(' ')}`,
      `prettier --write ${groupFiles.join(' ')}`
    ]),
    'git add'
  ],  
  'src/**/*.(sa|sc|le|c)ss': [    
    'stylelint --fix',
    'prettier --write',
    'git add'
  ]
};
