module.exports = {
  displayName: 'goosetyped',
  setupFiles: ['./jest-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/goosetyped',
  testPathIgnorePatterns : [
    '<rootDir>/testing/'
  ],
  preset: '@shelf/jest-mongodb',
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.0.2', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  },
  setupFilesAfterEnv: ['./jest-setup-after-env.js']
};

