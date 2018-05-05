
module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest" // Converts typscript to js before test-run
  },
  testMatch: [ '**/__tests__/**/*.(ts|js)?(x)', '**/?(*.)(spec|test).(ts|js)?(x)' ]
};
