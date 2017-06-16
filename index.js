const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const workingDirPath = path.join(__dirname, '..', '..');
const fileName = path.join(workingDirPath, 'package.json');
const simpleGit = require('simple-git')(workingDirPath);
const pkg = require(fileName);

simpleGit.init();

// add scripts
pkg.scripts = pkg.scripts || {}
pkg.scripts['check'] = 'tsc --noEmit'
pkg.scripts['lint'] = 'tslint -c ./tslint.json --project ./tsconfig.json -e "src/**/*.d.ts"';
pkg.scripts['test'] = 'jest --silent';
pkg.scripts['validate'] = 'npm run lint && npm run check && npm run test';
pkg.scripts['postmerge'] = 'yarn install';
pkg.scripts['precommit'] = 'npm run validate';

pkg.jest = {
  "preset": "react-native",
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ]
};

fs.writeFileSync(fileName, JSON.stringify(pkg, undefined, 2));

rimraf.sync(path.join(workingDirPath, '__tests__', 'index.*.js'));

console.log('🎉 Template postinstall script complete.')