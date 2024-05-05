process.env.MONGO_URL = 'mongodb://127.0.0.1';

module.exports = {
  displayName: 'goosetyped',
  preset: '../../jest.preset.js',
  setupFiles: ['./jest-setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/goosetyped',
};
