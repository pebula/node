import { P } from '@pebula/tom/serialization';
import { BasicModel, NestedModel } from './iface';

export class BasicModelTom implements BasicModel {
  @P ready?: boolean;

  @P.asArray(String)
  tags: string[] = [];

  @P priority: number = 0;

  @P public id: number;
  @P public name: string;

}

export class NestedModelTom implements NestedModel {
  @P uuid: string;
  @P serial: string;
  @P basic: BasicModelTom;
  @P nested?: NestedModelTom;
}
