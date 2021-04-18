module.exports = {
  displayName: 'nesbus',
  setupFiles: ['./jest-setup.ts'],
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns : [
    '<rootDir>/tests/server/',
    '<rootDir>/tests/utils/'
  ],
  coverageDirectory: '../../coverage/libs/nesbus',
  testEnvironment: '<rootDir>/tests/utils/service-bus-env-setup/jest-service-bus-test-environment',
  testEnvironmentOptions: {
    envSetup: false,
    envTeardown: false,
  },
};
