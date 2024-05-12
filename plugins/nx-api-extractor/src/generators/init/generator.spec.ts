import { readJson, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { initGenerator } from './generator';
import { InitGeneratorSchema } from './schema';

describe('nx-api-extractor', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should generate files', async () => {
    initGenerator(tree, {});
    expect(tree.exists('api-extractor.base.json')).toBeTruthy();
  });

  it('should not override existing files', async () => {
    tree.write('api-extractor.base.json', `test`);
    initGenerator(tree, {});
    expect(tree.read('api-extractor.base.json')!.toString()).toEqual('test');
  });

  it('should add dependencies', async () => {
    initGenerator(tree, {});
    const packageJson = readJson(tree, 'package.json');
    expect(
      packageJson.devDependencies['@pebula/nx-api-extractor']
    ).toBeDefined();
  });
});

