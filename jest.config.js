
module.exports = {
  verbose: true,
  testEnvironment: 'node',
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js" // Converts typscript to js before test-run
  },
  testMatch: [ '**/__tests__/**/*.(ts|js)?(x)', '**/?(*.)(spec|test).(ts|js)?(x)' ]
};
