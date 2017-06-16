const fs = require('fs');
const path = require('path');
const workingDirPath = path.join(__dirname, '..', '..');
const fileName = path.join(workingDirPath, 'package.json');
const simpleGit = require('simple-git')(workingDirPath);
const pkg = require(fileName);

simpleGit.init();

// add scripts
pkg.scripts = pkg.scripts || {}
pkg.scripts['check'] = 'tsc --noEmit'
pkg.scripts['lint'] = 'tslint -c ./tslint.json --project ./tsconfig.json -e "src/**/*.d.ts"';
pkg.scripts['test'] = 'jest';
pkg.scripts['validate'] = 'npm run lint && npm run check && npm run jest';
pkg.scripts['postmerge'] = 'npm install';
pkg.scripts['precommit'] = 'npm run validate';
pkg.scripts['postinstall'] = 'node node_modules/r-n-t-typescript-postinstal/template-postinstall.js';

fs.writeFileSync(fileName, JSON.stringify(pkg, undefined, 2));

console.log('🎉 Template postinstall script complete.')