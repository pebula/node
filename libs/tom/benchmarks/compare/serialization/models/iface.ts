export interface BasicModel {
  id: number;
  name: string;
  ready?: boolean;
  tags: string[];
  priority: number;
}

export interface NestedModel {
  uuid: string;
  serial: string;
  basic: BasicModel;
  nested?: NestedModel;
}

export interface NestedModel {
  uuid: string;
  serial: string;
  basic: BasicModel;
  nested?: NestedModel;
}
