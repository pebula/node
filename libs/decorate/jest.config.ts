/* eslint-disable */
export default {
  displayName: 'decorate',
  preset: '../../jest.preset.js',
  setupFiles: ['./jest-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/decorate',
};
