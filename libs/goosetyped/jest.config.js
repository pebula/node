module.exports = {
  displayName: 'goosetyped',
  setupFiles: ['./jest-setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsConfig: '<rootDir>/tsconfig.spec.json' }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/goosetyped',
  testPathIgnorePatterns : [
    '<rootDir>/testing/'
  ],
  preset: '@shelf/jest-mongodb',
  setupFilesAfterEnv: ['./jest-setup-after-env.js']
};

