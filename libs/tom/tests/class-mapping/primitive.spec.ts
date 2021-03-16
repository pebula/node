import { Type } from '@pebula/decorate';
import { P, defineClassMapping, getMapper } from '@pebula/tom';
import { clearMap, tomDescribeMapperJIT } from '@pebula/tom/testing';

tomDescribeMapperJIT('@pebula/tom', optionsFactory => {

  describe('Types: primitive', () => {

    describe('"boolean" JSON compiler', () => {
      class Model {
        @P value: boolean;

        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }
      let sourceCls: Type<any>;

      afterEach(() => clearMap(sourceCls, Model) );

      it('should map boolean to boolean and null to null', () => {
        defineClassMapping(Model, optionsFactory()).seal();
        const selfMapper = getMapper(Model);
        expect(selfMapper.transform(new Model(true), {}).value).toBe(true);
        expect(selfMapper.transform(new Model(false), {}).value).toBe(false);
        expect(selfMapper.transform(new Model(null), {}).value).toBe(undefined); // because not nullable
        clearMap(Model, Model);
      });

      it('should map number to boolean', () => {
        class ModelSource {
          @P value: number;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        // NUMBER -> BOOLEAN
        let mappedModel = mapper.transform(new ModelSource(1), {});
        expect(mappedModel.value).toBe(true);
        mappedModel = mapper.transform(new ModelSource(0), {});
        expect(mappedModel.value).toBe(false);
        mappedModel = mapper.transform(new ModelSource(9), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);

      });

      it('should map string to boolean', () => {
        class ModelSource {
          @P value: string;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        // STRING -> BOOLEAN
        let mappedModel = mapper.transform(new ModelSource('1'), {});
        expect(mappedModel.value).toBe(true);
        mappedModel = mapper.transform(new ModelSource('true'), {});
        expect(mappedModel.value).toBe(true);
        mappedModel = mapper.transform(new ModelSource(''), {});
        expect(mappedModel.value).toBe(false);
        mappedModel = mapper.transform(new ModelSource('0'), {});
        expect(mappedModel.value).toBe(false);
        mappedModel = mapper.transform(new ModelSource('false'), {});
        expect(mappedModel.value).toBe(false);
        mappedModel = mapper.transform(new ModelSource('test'), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);

      });

      it('should map boolean literals to boolean', () => {
        class ModelSource {
          @P.literal(true) value: true;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value')
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(true), {});
        expect(mappedModel.value).toBe(true);
        mappedModel = mapper.transform(new ModelSource(false), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(undefined), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should not map string literals to boolean if string is not a valid boolean cast', () => {
        class ModelSource {
          @P.literal('value') value: 'value';

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource('value'), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel =  mapper.transform(new ModelSource('true'), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel =  mapper.transform(new ModelSource(true), {});
        expect(mappedModel.value).toBe(undefined);

      });

      it('should map string literals to boolean if string is a valid boolean cast', () => {
        class ModelSource {
          @P.literal('true') value: 'true';

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel =  mapper.transform(new ModelSource('true'), {});
        expect(mappedModel.value).toBe(true);
        mappedModel =  mapper.transform(new ModelSource('false'), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map numeric literals to boolean if numeric value is a valid boolean cast', () => {
        class ModelSource {
          @P.literal(1) value: 1;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel =  mapper.transform(new ModelSource(1), {});
        expect(mappedModel.value).toBe(true);
        mappedModel =  mapper.transform(new ModelSource(99), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel =  mapper.transform(new ModelSource(0), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should not map numeric literals to boolean if numeric value is not a valid boolean cast', () => {
        class ModelSource {
          @P.literal(99) value: 99;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel =  mapper.transform(new ModelSource(1), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel =  mapper.transform(new ModelSource(99), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel =  mapper.transform(new ModelSource(0), {});
        expect(mappedModel.value).toBe(undefined);
      });
    });

    describe('"number" JSON compiler', () => {
      class Model {
        @P value: number;

        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }
      let sourceCls: Type<any>;

      afterEach(() => clearMap(sourceCls, Model) );

      it('should map number to number and null to null', () => {
        defineClassMapping(Model, optionsFactory()).seal();
        const selfMapper = getMapper(Model);
        expect(selfMapper.transform(new Model(5), {}).value).toBe(5);
        expect(selfMapper.transform(new Model(-34234324), {}).value).toBe(-34234324);
        expect(selfMapper.transform(new Model(null), {}).value).toBe(undefined); // because not nullable
        clearMap(Model, Model);
      });


      it('should map boolean to number', () => {
        class ModelSource {
          @P value: boolean;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(true), {});
        expect(mappedModel.value).toBe(1);
        mappedModel = mapper.transform(new ModelSource(false), {});
        expect(mappedModel.value).toBe(0);
        mappedModel = mapper.transform(new ModelSource('true'), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map string to number', () => {
        class ModelSource {
          @P value: string;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource('54'), {});
        expect(mappedModel.value).toBe(54);
        mappedModel = mapper.transform(new ModelSource('sew'), {});
        expect(mappedModel.value).toBe(NaN);
        mappedModel = mapper.transform(new ModelSource('-433'), {});
        expect(mappedModel.value).toBe(-433);
        mappedModel = mapper.transform(new ModelSource('0'), {});
        expect(mappedModel.value).toBe(0);
        mappedModel = mapper.transform(new ModelSource(true), {}); +true
        expect(mappedModel.value).toBe(1);
        mappedModel = mapper.transform(new ModelSource(1), {}); // +1
        expect(mappedModel.value).toBe(1);
        mappedModel = mapper.transform(new ModelSource(null), {}); // because not nullable
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(undefined), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map date to number', () => {
        class ModelSource {
          @P value: Date;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        const d = new Date();
        let mappedModel = mapper.transform(new ModelSource(d), {});
        expect(mappedModel.value).toBe(d.valueOf());

        mappedModel = mapper.transform(new ModelSource(null), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map numeric literals to numeric values', () => {
        class ModelSource {
          @P.literal(55) value: 55 | 99;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value')
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(55), {});
        expect(mappedModel.value).toBe(55);
        mappedModel = mapper.transform(new ModelSource(99), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map numeric string literals to numeric values', () => {
        class ModelSource {
          @P.literal('98989') value: '98989';

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource('98989'), {});
        expect(mappedModel.value).toBe(98989);
        mappedModel = mapper.transform(new ModelSource('3333'), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(null), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should not map non-numeric string literals to numeric values', () => {
        class ModelSource {
          @P.literal('value') value: 'value';

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource('value'), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource('555'), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
      });

      it('should boolean literals to numeric values', () => {
        class ModelSource {
          @P.literal(true) value: true;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(true), {});
        expect(mappedModel.value).toBe(1);
        mappedModel = mapper.transform(new ModelSource(false), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
      });

    });

    describe('"string" JSON compiler', () => {
      class Model {
        @P value: string;

        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }
      let sourceCls: Type<any>;

      afterEach(() => clearMap(sourceCls, Model) );

      it('should map string to string and null to null', () => {
        defineClassMapping(Model, optionsFactory()).seal();
        const selfMapper = getMapper(Model);
        expect(selfMapper.transform(new Model('test'), {}).value).toBe('test');
        expect(selfMapper.transform(new Model('6'), {}).value).toBe('6');
        expect(selfMapper.transform(new Model(null), {}).value).toBe(undefined); // because not nullable
        clearMap(Model, Model);
      });

      it('should map boolean to string', () => {
        class ModelSource {
          @P value: boolean;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(true), {});
        expect(mappedModel.value).toBe('true');
        mappedModel = mapper.transform(new ModelSource(false), {});
        expect(mappedModel.value).toBe('false');
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);
        mappedModel = mapper.transform(new ModelSource(null), {});
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map number to string', () => {
        class ModelSource {
          @P value: number;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(54), {});
        expect(mappedModel.value).toBe('54');
        mappedModel = mapper.transform(new ModelSource(NaN), {});
        expect(mappedModel.value).toBe('NaN');
        mappedModel = mapper.transform(new ModelSource(-433), {});
        expect(mappedModel.value).toBe('-433');
        mappedModel = mapper.transform(new ModelSource(0.34234343), {});
        expect(mappedModel.value).toBe('0.34234343');
        mappedModel = mapper.transform(new ModelSource(null), {});
        expect(mappedModel.value).toBe(undefined); // because not nullable
        mappedModel = mapper.transform(new ModelSource(), {});
        expect(mappedModel.value).toBe(undefined);
      });


      it('should map date to string', () => {
        class ModelSource {
          @P value: Date;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        const d = new Date();
        let mappedModel = mapper.transform(new ModelSource(d), {});
        expect(mappedModel.value).toBe(d.toJSON());

        mappedModel = mapper.transform(new ModelSource(null), {});
        expect(mappedModel.value).toBe(undefined);
      });


      it('should map string literals to string values', () => {
        class ModelSource {
          @P.literal('value') value: 'value';

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value')
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource('value'), {});
        expect(mappedModel.value).toBe('value');
        mappedModel = mapper.transform(new ModelSource('other'), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
      });

      it('should map numeric literals to string values', () => {
        class ModelSource {
          @P.literal(55) value: 55;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(55), {});
        expect(mappedModel.value).toBe('55');
        mappedModel = mapper.transform(new ModelSource(99), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
      });


      it('should map boolean literals to string values', () => {
        class ModelSource {
          @P.literal(true) value: true;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        let mappedModel = mapper.transform(new ModelSource(true), {});
        expect(mappedModel.value).toBe('true');
        mappedModel = mapper.transform(new ModelSource(false), {}); // non existing literal
        expect(mappedModel.value).toBe(undefined);
      });


    });

    describe('"date" JSON compiler', () => {
      class Model {
        @P value: Date;

        constructor(value?: any) {
          if (arguments.length === 1) {
            this.value = value;
          }
        }
      }
      let sourceCls: Type<any>;

      afterEach(() => clearMap(sourceCls, Model) );

      it('should map date to date and null to null', () => {
        defineClassMapping(Model, optionsFactory()).seal();
        const d = new Date();
        const selfMapper = getMapper(Model);
        expect(selfMapper.transform(new Model(d), {}).value).toBe(d);
        expect(selfMapper.transform(new Model(new Date()), {}).value).not.toBe(d);
        expect(selfMapper.transform(new Model(new Date(d.valueOf())), {}).value).not.toBe(d);
        expect(selfMapper.transform(new Model(new Date(d.valueOf())), {}).value).toEqual(d);
        expect(selfMapper.transform(new Model(null), {}).value).toBe(undefined); // because not nullable
        clearMap(Model, Model);
      });

      it('should map number to date', () => {
        class ModelSource {
          @P value: number;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        const d = new Date();

        let mappedModel = mapper.transform(new ModelSource(d.valueOf()), {});
        expect(mappedModel.value).toEqual(d);
        mappedModel = mapper.transform(new ModelSource(Date.now() + 50000), {});
        expect(mappedModel.value).not.toEqual(d);
      });

      it('should map string to string', () => {
        class ModelSource {
          @P value: string;

          constructor(value?: any) {
            if (arguments.length === 1) {
              this.value = value;
            }
          }
        }

        defineClassMapping(sourceCls = ModelSource, Model, optionsFactory())
          .forMember('value', 'value', true)
          .seal();

        const mapper = getMapper(ModelSource, Model);

        const d = new Date();

        let mappedModel = mapper.transform(new ModelSource(d.toJSON()), {});
        expect(mappedModel.value).toEqual(d);
        mappedModel = mapper.transform(new ModelSource(new Date(d.valueOf() + 5000).toJSON()), {});
        expect(mappedModel.value).not.toEqual(d);
      });
    });

  });
});
