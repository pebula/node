afterAll(() => require('fs').unlink(process.cwd() + '/globalConfig.json', () => {}) );
