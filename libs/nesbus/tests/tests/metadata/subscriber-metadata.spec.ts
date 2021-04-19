import { SbSubscriberMetadata } from '../../../src/lib/metadata/subscriber-metadata';

describe('@pebula/nesbus', () => {

  it('should detect if it is subscriber metadata', async () => {
    const value: any = {};
    const metadata = new SbSubscriberMetadata('queue', value);
    expect(SbSubscriberMetadata.is(metadata)).toBe(true);
    expect(SbSubscriberMetadata.is({})).toBe(false);
  });

  it('should use metadata options in SbSubscriberMetadata', async () => {
    const value: any = {};
    const metadata = new SbSubscriberMetadata('queue', value);
    expect(metadata.ready).toBe(true);
    await metadata.init();
    expect(metadata.metaOptions).toStrictEqual(value);
    expect(metadata.ready).toBe(true)
  });

  it('should resolve metadata factory in SbSubscriberMetadata', async () => {
    const value: any = {};
    const metadata = new SbSubscriberMetadata('queue', () => value);
    expect(metadata.ready).toBe(false);
    await metadata.init();
    expect(metadata.metaOptions).toBe(value);
    expect(metadata.ready).toBe(true)
  });

  it('should resolve async metadata factory in SbSubscriberMetadata', async () => {
    const value: any = {};
    const metadata = new SbSubscriberMetadata('queue', () => Promise.resolve(value));
    expect(metadata.ready).toBe(false);
    await metadata.init();
    expect(metadata.metaOptions).toBe(value);
    expect(metadata.ready).toBe(true)
  });
});
