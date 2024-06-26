import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nx/plugin/testing';
describe('nx-api-extractor e2e', () => {
  it('should create nx-api-extractor', async (done) => {
    const plugin = uniq('nx-api-extractor');
    ensureNxProject('@pebula/nx-api-extractor', 'dist/libs/nx-api-extractor');
    await runNxCommandAsync(
      `generate @pebula/nx-api-extractor:nx-api-extractor ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-api-extractor');
      ensureNxProject('@pebula/nx-api-extractor', 'dist/libs/nx-api-extractor');
      await runNxCommandAsync(
        `generate @pebula/nx-api-extractor:nx-api-extractor ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-api-extractor');
      ensureNxProject('@pebula/nx-api-extractor', 'dist/libs/nx-api-extractor');
      await runNxCommandAsync(
        `generate @pebula/nx-api-extractor:nx-api-extractor ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
