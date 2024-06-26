import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nx/plugin/testing';
describe('nx-build-pipe e2e', () => {
  it('should create nx-build-pipe', async (done) => {
    const plugin = uniq('nx-build-pipe');
    ensureNxProject('@pebula/nx-build-pipe', 'dist/libs/nx-build-pipe');
    await runNxCommandAsync(
      `generate @pebula/nx-build-pipe:nx-build-pipe ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-build-pipe');
      ensureNxProject('@pebula/nx-build-pipe', 'dist/libs/nx-build-pipe');
      await runNxCommandAsync(
        `generate @pebula/nx-build-pipe:nx-build-pipe ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-build-pipe');
      ensureNxProject('@pebula/nx-build-pipe', 'dist/libs/nx-build-pipe');
      await runNxCommandAsync(
        `generate @pebula/nx-build-pipe:nx-build-pipe ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
