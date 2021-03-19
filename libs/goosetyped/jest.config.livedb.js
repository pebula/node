process.env.MONGO_URL = 'mongodb://127.0.0.1';

module.exports = {
  displayName: 'goosetyped',
  preset: '../../jest.preset.js',
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
};
