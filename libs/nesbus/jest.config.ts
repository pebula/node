/* eslint-disable */
export default {
  displayName: 'nesbus',
  maxWorkers: '1',
  setupFiles: ['./jest-setup.ts'],
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: [],
  coveragePathIgnorePatterns: [
    '<rootDir>/arm-adapter',
    '<rootDir>/src/lib/atom-adapter/atom-client',
    '<rootDir>/tests/__env',
  ],
  coverageDirectory: '../../coverage/libs/nesbus',
  testEnvironment:
    '<rootDir>/tests/__env/utils/service-bus-env-setup/init-runtime',
  testEnvironmentOptions: {
    envSetup: true,
    envTeardown: true,
  },
};
