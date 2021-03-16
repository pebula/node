import { ClassSchema } from '../../schema';
import { DECOR_API_TYPE } from '../types';
import { IPluginContext } from '../plugin-context';

/**
 * A base class for all DecorApi mixin classes
 * A class that you extend when you want to implement a mixin.
 * All plugin decorators does not impose type constraints when the decorate a MixinBase.
 * The context will represent a schema you provide through `TSchema` and the class schema provided in `TClassSchema`.
 * You can provide generic types that are partials and only cover the certain types required logically in your implementation.
 */
export abstract class DecorMixinBase<TSchema = unknown, TClassSchema extends ClassSchema = ClassSchema> {
  protected $$context: IPluginContext<DECOR_API_TYPE, TSchema, TClassSchema>;

  protected static getContext<S, C extends ClassSchema>(instance: DecorMixinBase<S, C>): IPluginContext<DECOR_API_TYPE, S, C> {
    return instance.$$context;
  }
}
