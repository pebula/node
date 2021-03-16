import { P } from './decorators';
import { Mixin } from './mixin';

describe('TOM Mixins', () => {
  it('should support mixins including copy of decorated properties', () => {

    class Mixin1 {
      @P myMixinValue: string = 'Test';
    }

    class Mixin2 {
      @P initValue: string;
      constructor() {
        this.initValue = 'InitValue';
      }
    }

    class Mixin3 {
      nonInitValue: string;
      constructor() {
        this.nonInitValue = 'NonInitValue';
      }
    }

    class Mixin4 {
      @P ctorParam: any;
      constructor(...args: any[]) {
        this.ctorParam = args[0];
      }
    }

    class Mixin5 {
      @P methodValue: string;
      constructor() {
        this.runMe();
      }

      private runMe() {
        this.methodValue = 'MethodValue';
      }
    }

    class BaseBaseMixin6 {
      @P deepNested: boolean = true

      protected runBaseBase6() {
        if (this.deepNested) {
          return 1;
        } else {
          return 0;
        }
      }
    }

    class BaseMixin6 extends BaseBaseMixin6 {
      @P baseSixMessage = 'ImBase6';
    }

    class Mixin6 extends Mixin(BaseMixin6) {
      @P onePlusOne: number;

      constructor() {
        super();
        this.onePlusOne = 1 + this.runBaseBase6();
      }
    }

    class Model extends Mixin(Mixin1, Mixin2, Mixin3, Mixin4, Mixin5, Mixin6) {
      @P myValue = 'MyValue';
      constructor(ctorValue: any) {
        super(ctorValue);
      }
    }

    const model = new Model('TestMixins');
    expect(model.myMixinValue).toBe('Test');
    expect(model.initValue).toBe('InitValue');
    expect(model.nonInitValue).toBeUndefined();
    expect(model.ctorParam).toBe('TestMixins');
    expect(model.methodValue).toBe('MethodValue');
    expect(model.deepNested).toBe(true);
    expect(model.baseSixMessage).toBe('ImBase6');
    expect(model.onePlusOne).toBe(2);

  });
});
