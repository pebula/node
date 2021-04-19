import { SbEmitterMetadata } from '../../../src/lib/metadata/emitter-metadata';
describe('@pebula/nesbus', () => {
  it('should detect if it is emitter metadata', async () => {
    const value: any = {};
    const metadata = new SbEmitterMetadata('queue', value);
    expect(SbEmitterMetadata.is(metadata)).toBe(true);
    expect(SbEmitterMetadata.is({})).toBe(false);
  });

  it('should use metadata options in SbEmitterMetadata', async () => {
    const value: any = {};
    const metadata = new SbEmitterMetadata('queue', value);
    expect(metadata.ready).toBe(true);
    await metadata.init();
    expect(metadata.metaOptions).toStrictEqual(value);
    expect(metadata.ready).toBe(true)
  });

  it('should resolve metadata factory in SbEmitterMetadata', async () => {
    const value: any = {};
    const metadata = new SbEmitterMetadata('queue', () => value);
    expect(metadata.ready).toBe(false);
    await metadata.init();
    expect(metadata.metaOptions).toBe(value);
    expect(metadata.ready).toBe(true)
  });

  it('should resolve async metadata factory in SbEmitterMetadata', async () => {
    const value: any = {};
    const metadata = new SbEmitterMetadata('queue', () => Promise.resolve(value));
    expect(metadata.ready).toBe(false);
    await metadata.init();
    expect(metadata.metaOptions).toBe(value);
    expect(metadata.ready).toBe(true)
  });
});
