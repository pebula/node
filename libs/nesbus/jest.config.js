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

  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests/__env',
],
  coverageDirectory: '../../coverage/libs/nesbus',
  testEnvironment: '<rootDir>/tests/__env/utils/service-bus-env-setup/jest-service-bus-test-environment',
  testEnvironmentOptions: {
    envSetup: false,
    envTeardown: false,
  },
};
