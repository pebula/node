import { P, store } from './index';

describe('decorate', () => {

  it('', () => {
    class C {
      @P.discriminator
      key: string;

      @P.optional.as(Number).default(4)
      prop: string;
    }

    const classSchema = store.get(C);

    const prop = classSchema.getProperty('prop');
    expect(prop).toBeTruthy();
    expect(prop.defaultValue).toBe(4);
    expect(prop.type.type).toBe('number');
    expect(prop.reflectedType).toBe(String);
    expect(prop.optional).toBe(true);

    const key = classSchema.getProperty('key');
    expect(key).toBeTruthy();
    expect(key.isDiscriminator).toBe(true);
    expect(classSchema.discriminator).toBe(key);
  });


});
