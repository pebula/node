import { ClassDecoratorOf, PropertyDecoratorOf, MethodDecoratorOf } from '../types';
import { DecoratedDomain } from './decorated-domain';

describe('', () => {

  it('', () => {
    const domain = new DecoratedDomain();
    const MyEntityImmediate = domain.createImmediateDecorator<ClassDecoratorOf<any>>();
    const MyEntity = domain.createDecorator<ClassDecoratorOf<any>>();
    const MyProp = domain.createDecorator<PropertyDecoratorOf<string>>();
    const MyMethod = domain.createDecorator<MethodDecoratorOf<any, any>>();

    @MyEntityImmediate
    @MyEntity()
    class C {
      @MyProp() x: string;

      @MyMethod()
      method() {}
    }

    // expect(domain.getTarget(C).getMetadataFor(MyEntity)[0]).toEqual({
    //   decoratorArgs: {
    //     classType: C,
    //     target: C,
    //     type: 'class',
    //     isStatic: true,
    //   },
    //   metadata: undefined,
    // });
  });
});
