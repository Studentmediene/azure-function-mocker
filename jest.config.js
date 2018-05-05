
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
  testMatch: [ '**/__tests__/**/*.(ts|js)?(x)', '**/?(*.)(spec|test).(ts|js)?(x)' ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -20
    },
    './src/azfun/contextMocker.ts': {
      branches: 30,
      functions: 40,
      lines: 50,
      statemtents: -40
    }
  }
};
