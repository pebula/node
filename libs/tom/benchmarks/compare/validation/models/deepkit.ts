import { f } from '@deepkit/type';
import { BasicModel, BasicModelNested } from './iface';

export class BasicModelDeepKit implements BasicModel {
  @f.number number: number;
  @f.number.negative() negNumber: number;
  @f.number.maximum(500) maxNumber: number;
  @f.array(f.string) strings: string[];
  @f.string longString: string;
  @f.boolean boolean: boolean;
  @f.type(() => BasicModelNestedDeepKit) deeplyNested: BasicModelNested;
}

export class BasicModelNestedDeepKit implements BasicModelNested {
  @f.string foo: string;
  @f.number num: number;
  @f.boolean bool: boolean;
}
