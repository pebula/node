import { P, Schema } from '@pebula/tom';
import { ValidatorInfoTypeMap } from '../../known-validators';
import './property';

describe('@pebula/tom/validation', () => {

  it('should reflect min/max metadata', () => {

    class TestClass1 {
      @P.min(55) a: number;
      @P.max(99) b: number;
      @P c: number;
      @P.max(9999) d: number;
    }
    class TestClass2 extends TestClass1 {
      @P.max(999) c: number;
      @P d: number;
    }

    const meta1 = Schema.getSchema(TestClass1).getProperties()
      .reduce( (p, c) => {
        p[c.name] = c.validators?.reduce((prv, cur) => Object.assign(prv, { [cur.id]: cur.args }), {} as ValidatorInfoTypeMap);
        return p;
      }, {} as Record<keyof TestClass1, ValidatorInfoTypeMap>);

    const meta2 = Schema.getSchema(TestClass2).getProperties()
      .reduce( (p, c) => {
        p[c.name] = c.validators?.reduce((prv, cur) => Object.assign(prv, { [cur.id]: cur.args }), {} as ValidatorInfoTypeMap);
        return p;
      }, {} as Record<keyof TestClass1, ValidatorInfoTypeMap>);

    expect(meta1.a.min).toBe(55);
    expect(meta2.a.min).toBe(55);
    expect(meta1.a.max).toBeUndefined();
    expect(meta2.a.max).toBeUndefined();

    expect(meta1.b.min).toBeUndefined();
    expect(meta2.b.min).toBeUndefined();
    expect(meta1.b.max).toBe(99);
    expect(meta2.b.max).toBe(99);

    expect(meta1.c.min).toBeUndefined();
    expect(meta1.c.max).toBeUndefined();

    expect(meta2.c.min).toBeUndefined();
    expect(meta2.c.max).toBe(999);

    expect(meta1.d.min).toBeUndefined();
    expect(meta1.d.max).toBe(9999);

    expect(meta2.d.min).toBeUndefined();
    expect(meta2.d.max).toBeUndefined();
  });

  it('should reflect minLength/maxLength metadata', () => {

    class TestClass1 {
      @P.minLength(55) a: number;
      @P.maxLength(99) b: number;
      @P c: number;
      @P.maxLength(9999) d: number;
    }
    class TestClass2 extends TestClass1 {
      @P.maxLength(999) c: number;
      @P d: number;
    }

    const meta1 = Schema.getSchema(TestClass1).getProperties()
      .reduce( (p, c) => {
        p[c.name] = c.validators?.reduce((prv, cur) => Object.assign(prv, { [cur.id]: cur.args }), {} as ValidatorInfoTypeMap);
        return p;
      }, {} as Record<keyof TestClass1, ValidatorInfoTypeMap>);

    const meta2 = Schema.getSchema(TestClass2).getProperties()
      .reduce( (p, c) => {
        p[c.name] = c.validators?.reduce((prv, cur) => Object.assign(prv, { [cur.id]: cur.args }), {} as ValidatorInfoTypeMap);
        return p;
      }, {} as Record<keyof TestClass1, ValidatorInfoTypeMap>);

    expect(meta1.a.minLength).toBe(55);
    expect(meta2.a.minLength).toBe(55);
    expect(meta1.a.maxLength).toBeUndefined();
    expect(meta2.a.maxLength).toBeUndefined();

    expect(meta1.b.minLength).toBeUndefined();
    expect(meta2.b.minLength).toBeUndefined();
    expect(meta1.b.maxLength).toBe(99);
    expect(meta2.b.maxLength).toBe(99);

    expect(meta1.c.minLength).toBeUndefined();
    expect(meta1.c.maxLength).toBeUndefined();

    expect(meta2.c.minLength).toBeUndefined();
    expect(meta2.c.maxLength).toBe(999);

    expect(meta1.d.minLength).toBeUndefined();
    expect(meta1.d.maxLength).toBe(9999);

    expect(meta2.d.minLength).toBeUndefined();
    expect(meta2.d.maxLength).toBeUndefined();
  });
});
