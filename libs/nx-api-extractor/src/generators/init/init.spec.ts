import { readJson, writeJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { nxApiExtractorInitGenerator } from './init';

describe('nx-api-extractor', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyV1Workspace();
  });

  it('should generate files', async () => {
    nxApiExtractorInitGenerator(tree, {});
    expect(tree.exists('api-extractor.base.json')).toBeTruthy();
  });

  it('should not override existing files', async () => {
    tree.write('api-extractor.base.json', `test`);
    nxApiExtractorInitGenerator(tree, {});
    expect(tree.read('api-extractor.base.json').toString()).toEqual('test');
  });

  it('should add dependencies', async () => {
    nxApiExtractorInitGenerator(tree, {});
    const packageJson = readJson(tree, 'package.json');
    expect(
      packageJson.devDependencies['@pebula/nx-api-extractor']
    ).toBeDefined();
  });
});
