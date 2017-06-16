const fs = require('fs');
const path = require('path');
const workingDirPath = path.join(__dirname, '..', '..');
const fileName = path.join(workingDirPath, 'package.json');
const pkg = require(fileName);

// add scripts
pkg.scripts = pkg.scripts || {}
pkg.scripts['postinstall'] = undefined

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

console.log('🎉 Template postinstall script complete.')