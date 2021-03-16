import { Type } from '../types';
import { stringify } from '../utils';
import { DecoratorArgs, DecoratorArgsType } from '../store/decorator-args';

export function multipleDecorationsNotAllowed(decoratorName: string, decoratedType: Type<any>) {
  const error = new Error(`Decorator "${decoratorName}" used more then once on "${stringify(decoratedType)}"`);
  error.name = 'MultipleDecorationsNotAllowed';
  return error;
}

export function invalidDecorationScope(decoratorName: string, decoratorArgs: DecoratorArgs, allowedScopes: string[]) {
  const path: string[] = [stringify(decoratorArgs.classType)];

  if (!DecoratorArgsType.isClass(decoratorArgs)) {
    if (!DecoratorArgsType.isStatic(decoratorArgs)) {
      path.push('.prototype');
    }
    path.push(`.${stringify(DecoratorArgsType.isCtorParam(decoratorArgs) ? 'constructor' : decoratorArgs.key)}`);
    if (DecoratorArgsType.isParameterLike(decoratorArgs)) {
      path.push('(');
      for (let i = 0; i < decoratorArgs.index; i++) {
        path.push('?, ');
      }
      path.push(decoratorArgs.index.toString());

      path.push(')');
    }
  }

  const error = new Error(`Decorator "${decoratorName}" can not decorate "${path.join('')}", allowed scopes are "${stringify(allowedScopes)}"`);
  error.name = 'InvalidDecorationScope';
  return error;
}

