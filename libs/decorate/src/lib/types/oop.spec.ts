import { expectTypeOf } from 'expect-type';
import { Abstract, Class, AbstractClass, ClassType } from './oop';

describe('OOP types', () => {
  it('should reflect class types', () => {
    class Test {
      p: string;
      static sP: Date;

      m(p: Date): RegExp { return /x/; }
      sM(p: string): Date { return new Date(); }
    }

    const Test_1: Class<Test, typeof Test> = Test;
    const Test_2: ClassType<Test> = Test;
    // This should error, intuitively...
    // However, it seems ok if we assume class is a meta "sub-type" of abstract class.
    // I.E: we just narrow the runtime type to be abstract in design time
    const Test_3: Abstract<Test> = Test;
    const Test_4: AbstractClass<Test, typeof Test> = Test;

    const test_1 = new Test_1();
    const test_2 = new Test_2();
    // @ts-expect-error
    const test_3 = new Test_3();
    // @ts-expect-error
    const test_4 = new Test_4();

  });

  it('should reflect abstract class types', () => {
    abstract class Test {
      p: string;
      static sP: Date;

      m(p: Date): RegExp { return /x/; }
      sM(p: string): Date { return new Date(); }
    }

    const Test_1: Abstract<Test> = Test;
    const Test_2: AbstractClass<Test, typeof Test> = Test;

    // @ts-expect-error
    const Test_3: Class<Test, typeof Test> = Test;
    // @ts-expect-error
    const Test_4: ClassType<Test> = Test;

    // @ts-expect-error
    const test_1 = new Test_1();
    // @ts-expect-error
    const test_2 = new Test_2();

  });
});
