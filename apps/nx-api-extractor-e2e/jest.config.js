module.exports = {
  displayName: 'nx-api-extractor-e2e',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [ 'ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' } ]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/nx-api-extractor-e2e',
};
