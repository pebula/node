import 'reflect-metadata';
import { expectTypeOf } from 'expect-type'
import { ClassDecoratorOf, PropertyDecoratorOf, MethodDecoratorOf, Decorator, DecoratorInitializer } from '../types';
import { DecoratedDomain } from './decorated-domain';
import { multipleDecorationsNotAllowed } from './errors';
import { ClassifierRecord, TargetClassifier } from './target-classifier';
import { DecoratorArgs, PropertyDecoratorArgs, MethodDecoratorArgs, ParameterDecoratorArgs } from './decorator-args'

describe('DecoratedDomain', () => {
  let domain: DecoratedDomain;
  beforeEach(() => {
    domain = new DecoratedDomain();
  });

  describe('Creating Decorator', () => {

    it('should allow multiple decorations with the same decorator on the same type if allowMulti is enabled', () => {
      const onExecute = jest.fn() as jest.MockedFunction<(decoratorArgs: DecoratorArgs, metadata?: any) => void>;

      const P = domain.createDecorator<ParameterDecorator>({ onExecute });

      expect(() => {
        class TestClass {
          constructor(@P() param: string) { }
          method(@P() param: string) { }
        }
      }).not.toThrow();

      expect(onExecute).toBeCalledTimes(2);
    });

    it('should throw if a decorated is used multiple times on the same type but allowMulti is false', () => {
      expect(() => {
        const P = domain.createDecorator<ParameterDecorator>({ allowMulti: false });
        class TestClass {
          constructor(@P() param: string) { }
          method(@P() param: string) { }
        }
      }).toThrow(multipleDecorationsNotAllowed('Anonymous', class TestClass {}));

      expect(() => {
        const P = domain.createDecorator<ParameterDecorator>({ name: 'MyTestDecorator', allowMulti: false });
        class TestClass1 {
          constructor(@P() param: string) { }
          method(@P() param: string) { }
        }
      }).toThrow(multipleDecorationsNotAllowed('MyTestDecorator', class TestClass1 {}));
    });

    it('should throw if decorated scope is not allowed', () => {
      const C = domain.createDecorator({ allowedScopes: ['class'] });
      const F = domain.createDecorator({ allowedScopes: ['property'] });
      const M = domain.createDecorator({ allowedScopes: ['method'] });
      const FS = domain.createDecorator({ allowedScopes: ['propertyStatic'] });
      const MS = domain.createDecorator({ allowedScopes: ['methodStatic'] });
      const P = domain.createDecorator({ allowedScopes: ['parameter'] });
      const PS = domain.createDecorator({ allowedScopes: ['parameterStatic'] });
      const PC = domain.createDecorator({ allowedScopes: ['constructor'] });
      const CFM = domain.createDecorator({ allowedScopes: ['class', 'property', 'method', 'propertyStatic'] });

      expect(() => { @C() class TestClass { }}).not.toThrow();
      expect(() => { class TestClass { @C() p: string }}).toThrow();
      expect(() => { class TestClass { @C() static p: string }}).toThrow();
      expect(() => { class TestClass { @C() m() {} }}).toThrow();
      expect(() => { class TestClass { @C() static m() {} }}).toThrow();
      expect(() => { class TestClass { m(@C() x: string) {} }}).toThrow();

      expect(() => { @F() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @F() p: string }}).not.toThrow()
      expect(() => { class TestClass { @F() static p: string }}).toThrow();
      expect(() => { class TestClass { @F() m() {} }}).toThrow();
      expect(() => { class TestClass { @F() static m() {} }}).toThrow();
      expect(() => { class TestClass { m(@F() x: string) {} }}).toThrow();

      expect(() => { @M() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @M() p: string }}).toThrow();
      expect(() => { class TestClass { @M() static p: string }}).toThrow();
      expect(() => { class TestClass { @M() m() {} }}).not.toThrow();
      expect(() => { class TestClass { @M() static m() {} }}).toThrow();
      expect(() => { class TestClass { m(@M() x: string) {} }}).toThrow();

      expect(() => { @FS() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @FS() p: string }}).toThrow();
      expect(() => { class TestClass { @FS() static p: string }}).not.toThrow();
      expect(() => { class TestClass { @FS() m() {} }}).toThrow();
      expect(() => { class TestClass { @FS() static m() {} }}).toThrow();
      expect(() => { class TestClass { m(@FS() x: string) {} }}).toThrow();

      expect(() => { @MS() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @MS() p: string }}).toThrow();
      expect(() => { class TestClass { @MS() static p: string }}).toThrow();
      expect(() => { class TestClass { @MS() m() {} }}).toThrow();
      expect(() => { class TestClass { @MS() static m() {} }}).not.toThrow();
      expect(() => { class TestClass { m(@MS() x: string) {} }}).toThrow();

      expect(() => { @P() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @P() p: string }}).toThrow();
      expect(() => { class TestClass { @P() m() {} }}).toThrow();
      expect(() => { class TestClass { m(@P() x: string) {} }}).not.toThrow();
      expect(() => { class TestClass { static m(@P() x: string) {} }}).toThrow();
      expect(() => { class TestClass { constructor(@P() x: string) {} }}).toThrow();

      expect(() => { @PS() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @PS() p: string }}).toThrow();
      expect(() => { class TestClass { @PS() m() {} }}).toThrow();
      expect(() => { class TestClass { m(@PS() x: string) {} }}).toThrow();
      expect(() => { class TestClass { static m(@PS() x: string) {} }}).not.toThrow();
      expect(() => { class TestClass { constructor(@PS() x: string) {} }}).toThrow();

      expect(() => { @PC() class TestClass { }}).toThrow();
      expect(() => { class TestClass { @PC() p: string }}).toThrow();
      expect(() => { class TestClass { @PC() m() {} }}).toThrow();
      expect(() => { class TestClass { m(@PC() x: string) {} }}).toThrow();
      expect(() => { class TestClass { static m(@PC() x: string) {} }}).toThrow();
      expect(() => { class TestClass { constructor(@PC() x: string) {} }}).not.toThrow();

      expect(() => { @CFM() class TestClass { }}).not.toThrow();
      expect(() => { class TestClass { @CFM() p: string }}).not.toThrow();
      expect(() => { class TestClass { @CFM() static p: string }}).not.toThrow();
      expect(() => { class TestClass { @CFM() m() {} }}).not.toThrow();
      expect(() => { class TestClass { @CFM() static m() {} }}).toThrow();
      expect(() => { class TestClass { m(@CFM() x: string) {} }}).toThrow();
    });

    it('should run onExecute, when provided', () => {
      const onExecute = jest.fn() as jest.MockedFunction<(decoratorArgs: DecoratorArgs, metadata?: any) => void>;

      const C_NO = domain.createDecorator<ClassDecorator>();
      const C = domain.createDecorator<ClassDecorator>({ onExecute });
      const F = domain.createDecorator<PropertyDecorator>({ onExecute });
      const M = domain.createDecorator<MethodDecoratorOf<[string]>>({ onExecute });
      const P = domain.createDecorator<ParameterDecorator>({ allowMulti: true, onExecute });

      @C_NO()
      @C() //+1
      class TestClass {

        constructor(@P() param: string) { } //+1

        @F() prop: string; //+1

        @M() method(@P() param: string) { } //+2
      }

      expect(onExecute).toBeCalledTimes(5);
    });

    it('should create proper decorator initializer types', () => {
      interface Metadata { a: string; b: number }

      const C_NON = domain.createDecorator<ClassDecoratorOf<any>>();
      const C_REQ = domain.createDecorator<ClassDecoratorOf<any>, Metadata>();
      const C_OPT = domain.createDecorator<ClassDecoratorOf<any>, Metadata, true>();

      expectTypeOf(C_NON).parameter(0).toBeUndefined();
      expectTypeOf(C_REQ).parameter(0).toEqualTypeOf<Metadata>();
      expectTypeOf(C_OPT).toEqualTypeOf<(metadata?: Metadata) => ClassDecoratorOf<any, unknown>>();
      expectTypeOf(C_OPT).not.toEqualTypeOf<(metadata: Metadata) => ClassDecoratorOf<any, unknown>>();

      const F_NON = domain.createDecorator<PropertyDecoratorOf<any>>();
      const F_REQ = domain.createDecorator<PropertyDecoratorOf<any>, Metadata>();
      const F_OPT = domain.createDecorator<PropertyDecoratorOf<any>, Metadata, true>();

      expectTypeOf(F_NON).parameter(0).toBeUndefined();
      expectTypeOf(F_REQ).parameter(0).toEqualTypeOf<Metadata>();
      expectTypeOf(F_OPT).toEqualTypeOf<(metadata?: Metadata) => PropertyDecoratorOf<any>>();
      expectTypeOf(F_OPT).not.toEqualTypeOf<(metadata: Metadata) => PropertyDecoratorOf<any>>();
    });

    it('should create proper immediate decorator types', () => {
      const C = domain.createImmediateDecorator<ClassDecoratorOf<string>>();
      expectTypeOf(C).toEqualTypeOf<ClassDecoratorOf<string, unknown>>();

      const F = domain.createImmediateDecorator<PropertyDecoratorOf<Date>>();
      expectTypeOf(F).toEqualTypeOf<(target: Partial<Record<string, Date>>, key: string) => void>();
    });

    it('should resolve design time types', () => {
      const F = domain.createDecorator<PropertyDecoratorOf<any>>();
      const M = domain.createDecorator<PropertyDecoratorOf<any>>();
      const P = domain.createDecorator<ParameterDecorator>();

      class OtherClass { }
      class TestClass {

        constructor(@P() value: Set<string>, @P() input: OtherClass) { }

        @F() prop: string

        @M() method(): OtherClass { return new OtherClass(); }

        @M() extend(@P() newName: string, @P() dest: OtherClass): void { }
      }

      const prop = domain.getTarget(TestClass).getMetadataFor(F)[0].decoratorArgs as PropertyDecoratorArgs;
      expect(prop.designType).toBe(String);

      const [method, extend] = domain.getTarget(TestClass).getMetadataFor(M).map( m => m.decoratorArgs as MethodDecoratorArgs);
      expect(method.designType).toBe(OtherClass);
      expect(extend.designType).toBe(undefined);

      const parameters = domain.getTarget(TestClass)
        .getMetadataFor(P)
        .map( m => m.decoratorArgs as ParameterDecoratorArgs)
        .reduce( (groups, curr) => {
          const methodName = curr.key as string || 'constructor';
          if (!groups.has(methodName)) {
            groups.set(methodName, [curr])
          } else {
            groups.get(methodName).push(curr);
          }
          return groups;
        }, new Map<string, ParameterDecoratorArgs[]>());

      const [ value, input ] = parameters.get('constructor').map( d => d.designType ).reverse();
      const [ newName, dest ] = parameters.get('extend').map( d => d.designType ).reverse();

      expect(value).toBe(Set);
      expect(input).toBe(OtherClass);
      expect(newName).toBe(String);
      expect(dest).toBe(OtherClass);
    });

    it('should extend (inherit) properly', () => {
      const C = domain.createDecorator<ClassDecoratorOf<any>>();
      const F = domain.createDecorator<PropertyDecoratorOf<any>>();
      const M = domain.createDecorator<PropertyDecoratorOf<any>>();
      const P = domain.createDecorator<ParameterDecorator>();

      class TestClass {

        constructor(@P() value: string, @P() input: number) { }

        @F() prop: string
        @F() static staticProp: RegExp

        @M() extend(@P() newName: string, @P() dest: boolean): Date { return; }

        @M() static staticExtend(@P() sNewName: string[], @P() sDest: RegExp): Date { return; }
      }

      @C()
      class TestClassExt extends TestClass { }

      for (const cls of [TestClass, TestClassExt]) {
        const [prop, staticProp] = domain.getTarget(cls).getMetadataFor(F).map(m => m.decoratorArgs as PropertyDecoratorArgs);
        expect(prop.designType).toBe(String);
        expect(staticProp.designType).toBe(RegExp);

        const [extend, staticExtend] = domain.getTarget(cls).getMetadataFor(M).map( m => m.decoratorArgs as MethodDecoratorArgs);
        expect(extend.isStatic).toBe(false);
        expect(staticExtend.isStatic).toBe(true);
        expect(extend.designType).toBe(Date);
        expect(staticExtend.designType).toBe(Date);

        const parameters = domain.getTarget(cls)
          .getMetadataFor(P)
          .map( m => m.decoratorArgs as ParameterDecoratorArgs)
          .reduce( (groups, curr) => {
            const methodName = curr.key as string || 'constructor';
            if (!groups.has(methodName)) {
              groups.set(methodName, [curr])
            } else {
              groups.get(methodName).push(curr);
            }
            return groups;
          }, new Map<string, ParameterDecoratorArgs[]>());

        const [ value, input ] = parameters.get('constructor').map( d => d.designType ).reverse();
        const [ newName, dest ] = parameters.get('extend').map( d => d.designType ).reverse();
        const [ sNewName, sDest ] = parameters.get('staticExtend').map( d => d.designType ).reverse();

        expect(value).toBe(String);
        expect(input).toBe(Number);
        expect(newName).toBe(String);
        expect(dest).toBe(Boolean);
        expect(sNewName).toBe(Array);
        expect(sDest).toBe(RegExp);
      }

      @C()
      class TestClassExt2 extends TestClassExt {
        @F() static staticProp: any;

        @M() extend(@P() newName: string, @P() dest: boolean, @P() again?: number): Date { return; }

        @M() added(@P() addedValue: string): TestClass { return ;}
      }

      const [prop, staticProp] = domain.getTarget(TestClassExt2).getMetadataFor(F).map(m => m.decoratorArgs as PropertyDecoratorArgs);
      expect(prop.designType).toBe(String);
      expect(staticProp.designType).toBe(Object);

      const [extend, staticExtend, added] = domain.getTarget(TestClassExt2).getMetadataFor(M).map( m => m.decoratorArgs as MethodDecoratorArgs);
      expect(extend.isStatic).toBe(false);
      expect(staticExtend.isStatic).toBe(true);
      expect(extend.designType).toBe(Date);
      expect(staticExtend.designType).toBe(Date);
      expect(added.designType).toBe(TestClass);

      const parameters = domain.getTarget(TestClassExt2)
        .getMetadataFor(P)
        .map( m => m.decoratorArgs as ParameterDecoratorArgs)
        .reduce( (groups, curr) => {
          const methodName = curr.key as string || 'constructor';
          if (!groups.has(methodName)) {
            groups.set(methodName, [curr])
          } else {
            groups.get(methodName).push(curr);
          }
          return groups;
        }, new Map<string, ParameterDecoratorArgs[]>());

      const sort = (a, b) => a.index > b.index ? 1 : -1;
      const [ value, input ] = parameters.get('constructor').sort(sort).map( d => d.designType );
      const [ newName, dest, again ] = parameters.get('extend').sort(sort).map( d => d.designType );
      const [ sNewName, sDest ] = parameters.get('staticExtend').sort(sort).map( d => d.designType );
      const [ addedValue ] = parameters.get('added').map( d => d.designType );

      expect(value).toBe(String);
      expect(input).toBe(Number);
      expect(newName).toBe(String);
      expect(dest).toBe(Boolean);
      expect(again).toBe(Number);
      expect(sNewName).toBe(Array);
      expect(sDest).toBe(RegExp);
      expect(addedValue).toBe(String);

    });
  });
});
