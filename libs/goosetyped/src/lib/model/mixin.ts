// tslint:disable: max-classes-per-file
import { Document, Model, HydratedDocument } from 'mongoose';
import { ModelExtensions, SubDocument, Resource } from './model';
import { Ctor, ExtractMethod, ExtractProps } from '../utils';
import * as Base from './base';
import { gtSchemaStore } from '../store/schema-store';

function mixObjects(base: any, mixins: any[]): void {
  mixins.forEach(mixin => {
    Object.getOwnPropertyNames(mixin)
      .concat(Object.getOwnPropertySymbols(mixin) as any)
      .forEach(name => {
        // mixin can't override base behavior, only add
        if (!base.hasOwnProperty(name)) {
          // if its a property descriptor we need to rewire the context
          const propDesc = Object.getOwnPropertyDescriptor(mixin, name);
          if (propDesc) {
            Object.defineProperty(base, name, propDesc);
          } else {
            base[name] = mixin[name];
          }
        }
      });
  });
}

export function GtQuery<Q1>(QH: Ctor<Q1>): <T, C>(Cls: ExtModel<T, C> & C) => Ctor<Document & T> & C & ModelExtensions<Q1>
export function GtQuery<Q1, Q2>(Q1: Ctor<Q1>, Q2: Ctor<Q2>): <T, C>(Cls: ExtModel<T, C> & C) => Ctor<Document & T> & C & ModelExtensions<Q1 & Q2>
export function GtQuery<Q1, Q2, Q3>(Q1: Ctor<Q1>, Q2: Ctor<Q2>, Q3: Ctor<Q3>): <T, C>(Cls: ExtModel<T, C> & C) => Ctor<Document & T> & C & ModelExtensions<Q1 & Q2 & Q3>
export function GtQuery<Q1, Q2, Q3, Q4>(Q1: Ctor<Q1>, Q2: Ctor<Q2>, Q3: Ctor<Q3>, Q4: Ctor<Q4>): <T, C>(Cls: ExtModel<T, C> & C) => Ctor<Document & T> & C & ModelExtensions<Q1 & Q2 & Q3 & Q4>
export function GtQuery<QMIXIN>(...mixins: Array<Ctor<QMIXIN>>): <T, C>(Cls: ExtModel<T, C> & C) => Ctor<Document & T> & C & ModelExtensions<QMIXIN> {
  return <T, C>(Cls: ExtModel<T, C> & C) => {
    if (mixins.length > 0) {
      class QueryHelper { }
      mixObjects(QueryHelper.prototype, mixins.map(m => m.prototype));
      mixObjects(QueryHelper, mixins);
      gtSchemaStore.getCreate(Cls).defineQueryHelper(QueryHelper);
    }
    return Cls as any;
  }
}

type ThisParameter<T, F> = T extends { (this: infer This): void } ? This : F;
type AddThisParameter<T, D> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? ThisParameter<T[K], unknown> extends unknown
      ? (this: D, ...args: A) => R
      : T[K]
    : T[K];
};

type M<TI, TC> = Omit<ExtractMethod<Model<TI>>, 'prototype' | 'constructor' | keyof TC | keyof ModelExtensions>;
type P<TI, TC> = Omit<ExtractProps<Model<TI>>, 'prototype' | 'constructor' | keyof TC | keyof ModelExtensions>;

export type ExtModel<TI, TC> = {
  new (doc?: Partial<ExtractProps<TI>>, fields?: any | null, options?: boolean | any): HydratedDocument<TI>;
} & ModelExtensions & M<TI, TC> & P<TI, TC>;

export function GtModel<T1, C1, T2, C2, T3, C3, T4, C4, T5, C5>(m1: C1 & Ctor<T1> = undefined, m2: C2 & Ctor<T2> = undefined, m3: C3 & Ctor<T3> = undefined, m4: C4 & Ctor<T4> = undefined, m5: C5 & Ctor<T5> = undefined) {
  const mixins = [m1, m2, m3, m4, m5].filter(m => !!m);
  class GtModelContainer extends Base.GtModelContainer { }

  if (mixins.length > 0) {
    mixObjects(GtModelContainer.prototype, mixins.map(m => m.prototype));
    mixObjects(GtModelContainer, mixins);
    gtSchemaStore.getCreate(GtModelContainer).defineMixins(mixins);
  }

  // return GtModelContainer as unknown as Ctor<Document<any, any, T1 & T2 & T3 & T4 & T5> & T1 & T2 & T3 & T4 & T5> & ModelExtensions & M & P
  return GtModelContainer as unknown as ExtModel<T1 & T2 & T3 & T4 & T5, C1 & C2 & C3 & C4 & C5>;
}

// mongoose.ObtainDocumentType<T>
// export function GtModel(): Ctor<Document> & Model;
// export function GtModel<T1, C1>(m1: C1 & Ctor<T1>): Ctor<Document & T1> & Model & C1;
// export function GtModel<T1, C1, T2, C2>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>): Ctor<Document & T1 & T2> & Model & C1 & C2;
// export function GtModel<T1, C1, T2, C2, T3, C3>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>): Ctor<Document & T1 & T2 & T3> & Model & C1 & C2 & C3;
// export function GtModel<T1, C1, T2, C2, T3, C3, T4, C4>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>, m4: C4 & Ctor<T4>): Ctor<Document & T1 & T2 & T3 & T4> & Model & C1 & C2 & C3 & C4;
// export function GtModel<T1, C1, T2, C2, T3, C3, T4, C4, T5, C5>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>, m4: C4 & Ctor<T4>, m5: C5 & Ctor<T5>): Ctor<Document & T1 & T2 & T3 & T4 & T5> & Model & C1 & C2 & C3 & C4 & C5;
// export function GtModel<TMIXIN, CMIXIN>(...mixins: Array<CMIXIN & Ctor<TMIXIN>>): Ctor<TMIXIN> & CMIXIN {

//   class GtModelContainer extends Base.GtModelContainer { }

//   if (mixins.length > 0) {
//     mixObjects(GtModelContainer.prototype, mixins.map(m => m.prototype));
//     mixObjects(GtModelContainer, mixins);
//     gtSchemaStore.getCreate(GtModelContainer).defineMixins(mixins);
//   }
//   return GtModelContainer as any;
// }

export function GtResource(): Ctor<SubDocument> & Resource;
export function GtResource<T1, C1>(m1: C1 & Ctor<T1>): Ctor<SubDocument & T1> & Resource & C1;
export function GtResource<T1, C1, T2, C2>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>): Ctor<SubDocument & T1 & T2> & Resource & C1 & C2;
export function GtResource<T1, C1, T2, C2, T3, C3>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>): Ctor<SubDocument & T1 & T2 & T3> & Resource & C1 & C2 & C3;
export function GtResource<T1, C1, T2, C2, T3, C3, T4, C4>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>, m4: C4 & Ctor<T4>): Ctor<SubDocument & T1 & T2 & T3 & T4> & Resource & C1 & C2 & C3 & C4;
export function GtResource<T1, C1, T2, C2, T3, C3, T4, C4, T5, C5>(m1: C1 & Ctor<T1>, m2: C2 & Ctor<T2>, m3: C3 & Ctor<T3>, m4: C4 & Ctor<T4>, m5: C5 & Ctor<T5>): Ctor<SubDocument & T1 & T2 & T3 & T4 & T5> & Resource & C1 & C2 & C3 & C4 & C5;
export function GtResource<TMIXIN, CMIXIN>(...mixins: Array<CMIXIN & Ctor<TMIXIN>>): Ctor<TMIXIN> & CMIXIN {

  class GtResourceContainer extends Base.GtResourceContainer { }

  if (mixins.length > 0) {
    mixObjects(GtResourceContainer.prototype, mixins.map(m => m.prototype));
    mixObjects(GtResourceContainer, mixins);
    gtSchemaStore.getCreate(GtResourceContainer).defineMixins(mixins);
  }
  return GtResourceContainer as any;
}
