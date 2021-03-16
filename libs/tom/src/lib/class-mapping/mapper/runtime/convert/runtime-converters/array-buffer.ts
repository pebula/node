import { MapperTypeConverter, mapperTypeConverterRegistry } from '../../mapping';

export const arrayBuffer = new MapperTypeConverter<'arrayBuffer', ArrayBuffer>('arrayBuffer')
  .setHandler<ArrayBuffer>('arrayBuffer', v => v.slice(0))
  .setHandler<string>('string', v => {
    const buf = Buffer.from(v, 'base64');
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  });

mapperTypeConverterRegistry.set(arrayBuffer);

