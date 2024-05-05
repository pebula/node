import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import JestEnvironmentNode from 'jest-environment-node';

export class JestServiceBusTestEnvironment extends JestEnvironmentNode {
  private sbEnvConfig: { envSetup?: boolean; envTeardown?: boolean; };

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
    this.sbEnvConfig = config.projectConfig?.testEnvironmentOptions ?? {} as any;
  }

  async setup() {
    await super.setup();
    if (this.sbEnvConfig.envSetup) {
      await require('./env-setup').run();
    }
  }

  async teardown() {
    await super.teardown();
    if (this.sbEnvConfig.envTeardown) {
      await require('./env-teardown').run();
    }
  }
}
