import { P, jsonSerializer } from '@pebula/tom/serialization';
import { clearSerializer, tomDescribeSerializerJIT } from '@pebula/tom/testing';

if (!('toJSON' in BigInt.prototype)) {
  BigInt.prototype['toJSON'] = function() {
    return `${this}n`;
  }
}

tomDescribeSerializerJIT('@pebula/tom', jsonSerializer, childSerializer => {

  describe('Types: union', () => {
    afterEach(() => {
      clearSerializer(childSerializer);
    });

    test('using fixed value', () => {
      class Model {
        @P.union('string', 'date', P.asArray('number').buildSchema()) a: any;
      }

      const serializer = childSerializer.create(Model);
      const d = new Date();

      let model = serializer.deserialize({ a: 'value' });
      expect(model.a).toBe('value');
      model = serializer.deserialize({ a: [4,5,9] });
      expect(model.a).toEqual([4,5,9]);
      model = serializer.deserialize({ a: d.toJSON() });
      expect(model.a).toStrictEqual(d);

      model.a = 'value';
      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe('value');

      model.a = [4,5,9];
      pojo = serializer.serialize(model);
      expect(pojo.a).toEqual([4,5,9]);

      model.a = d;
      pojo = serializer.serialize(model);
      expect(pojo.a).toStrictEqual(d.toJSON());
    });

    test('Union with literal', () => {
      class Model {
        @P.union('string', P.union(P.literal('myLiteral'), P.literal(243))) a: any;
      }

      const serializer = childSerializer.create(Model);

      let model = serializer.deserialize({ a: 'value' });
      expect(model.a).toBe('value');
      model = serializer.deserialize({ a: 'myLiteral' });
      expect(model.a).toBe('myLiteral');
      model = serializer.deserialize({ a: 243 });
      expect(model.a).toBe(243);
      model = serializer.deserialize({ a: 321 });
      expect(model.a).toBeUndefined();

      model.a = 'value';
      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe('value');

      model.a = 'myLiteral';
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe('myLiteral');

      model.a = 321;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBeUndefined();

      model.a = 243;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe(243);
    });


    describe('Union with bigInt', () => {
      test('should ignore number and properly differ between strings of bigInt and those which are not', () => {
        class Model {
          @P.union('string', 'number', 'bigInt') a: bigint | number | string;
        }

        childSerializer.define(Model).seal();

        let model = childSerializer.get(Model).deserialize({ a: 'value' });
        expect(model.a).toBe('value');

        model = childSerializer.get(Model).deserialize({ a: 3232 });
        expect(typeof model.a).toBe('bigint')
        expect(model.a).toBe(BigInt(3232));

        model = childSerializer.get(Model).deserialize({ a: '43243n' });
        expect(typeof model.a).toBe('bigint')
        expect(model.a).toBe(BigInt(43243));

        model = new Model();
        model.a = 'value';
        let pojo = childSerializer.get(Model).serialize(model);
        expect(pojo.a).toBe('value');

        model.a = 123;
        pojo = childSerializer.get(Model).serialize(model);
        expect(pojo.a).toBe(123);

        model.a = BigInt(3232);
        pojo = childSerializer.get(Model).serialize(model);
        expect(pojo.a).toBe('3232n');

      });
    });

    test('Union with enum', () => {
      enum JobStatus {
        Idle = 0,
        Running = '__running',
        Done = 100,
        Error = '__error',
      }

      class Model {
        @P.union('string', P.enum(JobStatus)) a: any;
      }

      const serializer = childSerializer.create(Model);

      let model = serializer.deserialize({ a: 'value' });
      expect(model.a).toBe('value');
      model = serializer.deserialize({ a: JobStatus.Idle });
      expect(model.a).toBe(0);
      model = serializer.deserialize({ a: JobStatus.Running });
      expect(model.a).toBe('__running');
      model = serializer.deserialize({ a: 321 });
      expect(model.a).toBeUndefined();

      model.a = 'value';
      let pojo = serializer.serialize(model);
      expect(pojo.a).toBe('value');

      model.a = JobStatus.Idle;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe(0);

      model.a = JobStatus.Running;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBe('__running');

      model.a = 132;
      pojo = serializer.serialize(model);
      expect(pojo.a).toBeUndefined();

      const labelSerializer = childSerializer.fork('enumAsLabels_true').setDefault('enumAsLabels', true).create(Model);
      model = labelSerializer.deserialize({ a: 'value' });
      expect(model.a).toBe('value');
      model = labelSerializer.deserialize({ a: 'Idle' });
      expect(model.a).toBe(0);
      model = labelSerializer.deserialize({ a: 'Running' });
      expect(model.a).toBe('__running');
      model = labelSerializer.deserialize({ a: 321 });
      expect(model.a).toBeUndefined();

      model.a = 'value';
      pojo = labelSerializer.serialize(model);
      expect(pojo.a).toBe('value');

      model.a = JobStatus.Idle;
      pojo = labelSerializer.serialize(model);
      expect(pojo.a).toBe('Idle');

      model.a = JobStatus.Running;
      pojo = labelSerializer.serialize(model);
      expect(pojo.a).toBe('Running');

      model.a = 132;
      pojo = labelSerializer.serialize(model);
      expect(pojo.a).toBeUndefined();

    });

    describe('Union with class type', () => {
      abstract class Animal<T extends string> {
        abstract readonly type: T;
      }

      class Dog extends Animal<'dog'> {
        @P.literal('dog').discriminator
        readonly type = 'dog';

        @P barkVolume: number;
      }

      class Cat extends Animal<'cat'> {
        @P.literal('cat').discriminator
        readonly type = 'cat';

        @P.union(...['low', 'medium', 'high'].map( l => P.literal(l).buildSchema() ))
        pouringIntensity: 'low' | 'medium' | 'high' = 'low';
      }

      class Hamster extends Animal<'hamster'> {
        @P.literal('hamster').discriminator
        readonly type = 'hamster';

        @P speed: number;
      }

      class Trainer {
        @P name: string;
      }

      class Walker {
        @P.literal('walker').discriminator type: 'walker';
        @P name: string;
      }

      class Farm {
        @P.union(Dog, Cat, Hamster)
        alphaPet: Animal<string>;

        @P.asArray(P.union(Dog, Cat, Hamster).buildSchema())
        residents: Array<Animal<string>>;

        @P.asMap(P.union(Dog, Cat, Hamster).buildSchema())
        names: Map<string, Animal<string>>;

        @P.union('string', Trainer)
        leadTrainer: string | Trainer;

        @P.union(P.asObjectMap(Walker).buildSchema(), Walker)
        walkers: Walker | { [name: string]: Walker };

        @P.union(P.asObjectMap(P.union(Dog, Cat, Hamster)), P.union(Dog, Cat, Hamster))
        candidates: Animal<string> | { [name: string]: Animal<string> };
      }

      const typeMap = {
        dog: Dog,
        cat: Cat,
        hamster: Hamster,
      };

      it('should detect the union of multiple classes in a single value and in containers', () => {
        const cooper: Required<Dog> = { type: 'dog', barkVolume: 5 };
        const luna: Required<Dog> = { type: 'dog', barkVolume: 9 };
        const milo: Required<Cat> = { type: 'cat', pouringIntensity: 'high' };
        const kitty: Required<Cat> = { type: 'cat', pouringIntensity: 'medium' };
        const biscuit: Required<Hamster> = { type: 'hamster', speed: 8 };
        const cheeks: Required<Hamster> = { type: 'hamster', speed: 5 };
        const farm: Required<Omit<Farm, 'names' | 'leadTrainer' | 'walkers' | 'candidates'>> & { names: { [name: string]: Animal<string> }} = {
          alphaPet: cooper,
          residents: [cooper, luna, milo, kitty, biscuit, cheeks],
          names: { cooper, luna, milo, kitty, biscuit, cheeks },
        };

        // Deserialize
        let model = childSerializer.create(Farm).deserialize(farm);
        expect(model).toBeInstanceOf(Farm);

        expect(model.alphaPet).toBeInstanceOf(Dog);
        expect(model.alphaPet).toEqual(cooper);

        expect(model.residents).toBeInstanceOf(Array);
        expect(model.residents.length).toBe(farm.residents.length);
        for (let i in model.residents) {
          expect(model.residents[i]).toBeInstanceOf(typeMap[farm.residents[i].type]);
          expect(model.residents[i]).toEqual(farm.residents[i]);
        }

        expect(model.names).toBeInstanceOf(Map);
        expect(model.names.size).toBe(Object.keys(farm.names).length);
        for (const [name, animal] of model.names) {
          expect(name in farm.names).toBe(true);
          expect(animal).toBeInstanceOf(typeMap[farm.names[name].type]);
          expect(animal).toEqual(farm.names[name]);
        }

        // Serialize
        const pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).toStrictEqual(farm);
      });

      it('should detect union class with no identification mechanism if its the only class in the union', () => {
        let farm: Pick<Farm, 'leadTrainer'> = { leadTrainer: 'joe' };

        let model = childSerializer.create(Farm).deserialize(farm);
        expect(model).toBeInstanceOf(Farm);
        expect(model.leadTrainer).toBe('joe');

        let pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).not.toBeInstanceOf(Farm);
        expect(pojo.leadTrainer).toBe('joe');

        farm.leadTrainer = { name: 'joe' };
        model = childSerializer.get(Farm).deserialize(farm);
        expect(model).toBeInstanceOf(Farm);
        expect(model.leadTrainer).toBeInstanceOf(Trainer);
        expect(model.leadTrainer).toEqual({ name: 'joe' });

        pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).not.toBeInstanceOf(Farm);
        expect(pojo.leadTrainer.name).toEqual('joe');
      });

      it('should detect a union of class and map-like', () => {
        const joe: Required<Walker> = { type: 'walker', name: 'joe' };
        const don: Required<Walker> = { type: 'walker', name: 'don' };
        let farm: Pick<Farm, 'walkers'> = { walkers: undefined };

        farm.walkers = joe;
        let model = childSerializer.create(Farm).deserialize(farm);
        expect(model.walkers).toBeInstanceOf(Walker);
        expect(model.walkers).toEqual(joe);

        let pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).not.toBeInstanceOf(Farm);
        expect(pojo.walkers).toEqual(joe);

        farm.walkers = { joe, don };
        model = childSerializer.create(Farm).deserialize(farm);
        expect(model).toBeInstanceOf(Farm);
        expect(model.walkers).not.toBeInstanceOf(Map);
        expect(Object.keys(model.walkers).length).toBe(Object.keys(farm.walkers).length);
        expect(model.walkers['joe']).toBeInstanceOf(Walker);
        expect(model.walkers['joe']).toEqual(joe);
        expect(model.walkers['don']).toBeInstanceOf(Walker);
        expect(model.walkers['don']).toEqual(don);

        pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).not.toBeInstanceOf(Farm);
        expect(pojo.walkers).toStrictEqual({ joe, don });
      });

      it('should support nested unions', () => {
        const cooper: Required<Dog> = { type: 'dog', barkVolume: 5 };
        const milo: Required<Cat> = { type: 'cat', pouringIntensity: 'high' };

        let farm: Pick<Farm, 'candidates'> = { candidates: undefined };

        farm.candidates = cooper;
        let model = childSerializer.create(Farm).deserialize(farm);
        expect(model.candidates).toBeInstanceOf(Dog);
        expect(model.candidates).toEqual(cooper);

        let pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).not.toBeInstanceOf(Farm);
        expect(pojo.candidates).toEqual(cooper);

        farm.candidates = { cooper, milo };
        model = childSerializer.create(Farm).deserialize(farm);
        expect(model).toBeInstanceOf(Farm);
        expect(model.candidates).not.toBeInstanceOf(Map);
        expect(Object.keys(model.candidates).length).toBe(Object.keys(farm.candidates).length);
        expect(model.candidates['cooper']).toEqual(cooper);
        expect(model.candidates['milo']).toEqual(milo);

        pojo = childSerializer.get(Farm).serialize(model);
        expect(pojo).not.toBeInstanceOf(Farm);
        expect(pojo.candidates).toStrictEqual({ cooper, milo });
      });

      it('should detect the union through instanceof when serializing (out)', () => {

        class A {
          @P name: string;
          @P a: string = 'a';
        }

        class B {
          @P name: string;
          @P b: string = 'b';
        }

        class C {
          @P name: string;
          @P c: string = 'c';
        }

        class Container {
          @P.union(A, B, C) union: A | B | C;
        }

        childSerializer.define(Container).seal('serialize');

        const model = new Container();
        model.union = new C();
        model.union.name = 'C';

        let pojo = childSerializer.get(Container).serialize(model);

        expect(pojo).not.toBeInstanceOf(Container);
        expect(pojo.union.name).toBe('C');
        expect(pojo.union.c).toBe('c');

        model.union = new B();
        model.union.name = 'B';

        pojo = childSerializer.get(Container).serialize(model);

        expect(pojo).not.toBeInstanceOf(Container);
        expect(pojo.union.name).toBe('B');
        expect(pojo.union.b).toBe('b');
      });
    });

    describe('Union with containers', () => {
      it('should serialize union types with array', () => {

        class Model {
          @P.asArray(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        const serializer = childSerializer.create(Model);

        expect(serializer.deserialize({ value: ['test'] })).toEqual(new Model(['test']));
        expect(serializer.deserialize({ value: [500] })).toEqual(new Model([500]));
        expect(serializer.deserialize({ value: [true] })).toEqual(new Model([true]));

        expect(serializer.deserialize({ value: [99] })).toEqual(new Model([]));
        expect(serializer.deserialize({ value: [false] })).toEqual(new Model([]));

        expect(serializer.serialize(new Model(['test']))).toEqual({ value: ['test'] });
        expect(serializer.serialize(new Model([500]))).toEqual({ value: [500] });
        expect(serializer.serialize(new Model([true]))).toEqual({ value: [true] });

        expect(serializer.serialize(new Model(['best!!']))).toEqual({ value: [] });
        expect(serializer.serialize(new Model([97979]))).toEqual({ value: [] });

      });

      it('should serialize union types with set', () => {

        class Model {
          @P.asSet(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        const serializer = childSerializer.create(Model);

        expect(serializer.deserialize({ value: ['test'] })).toEqual(new Model(new Set(['test'])));
        expect(serializer.deserialize({ value: [500] })).toEqual(new Model(new Set([500])));
        expect(serializer.deserialize({ value: [true] })).toEqual(new Model(new Set([true])));

        expect(serializer.deserialize({ value: [99] })).toEqual(new Model(new Set([])));
        expect(serializer.deserialize({ value: [false] })).toEqual(new Model(new Set([])));

        expect(serializer.serialize(new Model(new Set(['test'])))).toEqual({ value: ['test'] });
        expect(serializer.serialize(new Model(new Set([500])))).toEqual({ value: [500] });
        expect(serializer.serialize(new Model(new Set([true])))).toEqual({ value: [true] });

        expect(serializer.serialize(new Model(new Set(['best!!'])))).toEqual({ value: [] });
        expect(serializer.serialize(new Model(new Set([97979])))).toEqual({ value: [] });

      });

      it('should serialize union types with map', () => {

        class Model {
          @P.asMap(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        const serializer = childSerializer.create(Model);

        expect(serializer.deserialize({ value: { a: 'test' } })).toEqual(new Model(new Map([['a', 'test']])));
        expect(serializer.deserialize({ value: { b: 500 } })).toEqual(new Model(new Map([['b', 500]])));
        expect(serializer.deserialize({ value: { c: true } })).toEqual(new Model(new Map([['c', true]])));

        expect(serializer.deserialize({ value: { a: 99 } })).toEqual(new Model(new Map()));
        expect(serializer.deserialize({ value: { b: false } })).toEqual(new Model(new Map()));

        expect(serializer.serialize(new Model(new Map([['a', 'test']])))).toEqual({ value: { a: 'test' } });
        expect(serializer.serialize(new Model(new Map([['b', 500]])))).toEqual({ value: { b: 500 } });
        expect(serializer.serialize(new Model(new Map([['c', true]])))).toEqual({ value: { c: true } });

        expect(serializer.serialize(new Model(new Map([['d', 'best!!']])))).toEqual({ value: {} });
        expect(serializer.serialize(new Model(new Map([['e', 97979]])))).toEqual({ value: {} });

      });

      it('should serialize union types with objectMap', () => {

        class Model {
          @P.asObjectMap(P.union(P.literal(5), P.literal(500), P.literal(true), P.literal('test'), P.literal('best'))) value: 'test' | 'best' | true | 500 | 5;
          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        const serializer = childSerializer.create(Model);

        expect(serializer.deserialize({ value: { a: 'test' } })).toEqual(new Model({ a: 'test' }));
        expect(serializer.deserialize({ value: { b: 500 } })).toEqual(new Model({ b: 500 }));
        expect(serializer.deserialize({ value: { c: true } })).toEqual(new Model({ c: true }));

        expect(serializer.deserialize({ value: { a: 99 } })).toEqual(new Model({}));
        expect(serializer.deserialize({ value: { b: false } })).toEqual(new Model({}));

        expect(serializer.serialize(new Model({ a: 'test' }))).toEqual({ value: { a: 'test' } });
        expect(serializer.serialize(new Model({ b: 500 }))).toEqual({ value: { b: 500 } });
        expect(serializer.serialize(new Model({ c: true }))).toEqual({ value: { c: true } });

        expect(serializer.serialize(new Model({ a: 'best!!' }))).toEqual({ value: {} });
        expect(serializer.serialize(new Model({ b: 97979 }))).toEqual({ value: {} });

      });
    });
  });
});
