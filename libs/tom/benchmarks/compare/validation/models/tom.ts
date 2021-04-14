import { P } from '@pebula/tom/serialization';
import { BasicModel, BasicModelNested } from './iface';

export class BasicModelTom implements BasicModel {
  @P number: number;
  @P.negative negNumber: number;
  @P.max(500) maxNumber: number;
  @P.asArray('string') strings: string[];
  @P longString: string;
  @P boolean: boolean;
  @P.as(() => BasicModelNestedTom) deeplyNested: BasicModelNested;
}

export class BasicModelNestedTom implements BasicModelNested {
  @P foo: string;
  @P num: number;
  @P bool: boolean;
}
