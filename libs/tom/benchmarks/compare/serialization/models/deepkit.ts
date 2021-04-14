import { f } from '@deepkit/type';
import { BasicModel, NestedModel } from './iface';

export class BasicModelDeepKit implements BasicModel {
  @f id: number;
  @f name: string;

  @f ready?: boolean;

  @f.array(String) tags: string[] = [];

  @f priority: number = 0;
}

export class NestedModelDeepKit implements NestedModel {
  @f uuid: string;
  @f serial: string;
  @f basic: BasicModelDeepKit;
  @f nested?: NestedModelDeepKit;
}
