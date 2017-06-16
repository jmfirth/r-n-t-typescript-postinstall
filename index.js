const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, '..', '..', 'package.json');
const pkg = require(fileName);

// add scripts
pkg.scripts = pkg.scripts || {}
pkg.scripts['check'] = 'tsc --noEmit'
pkg.scripts['lint'] = 'tslint -c ./tslint.json --project ./tsconfig.json -e "src/**/*.d.ts"';
pkg.scripts['test'] = 'jest';
pkg.scripts['validate'] = 'npm run lint && npm run check && npm run jest';
pkg.scripts['postinstall'] = 'npm install';
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

console.log('🎉 Template postinstall script complete.')