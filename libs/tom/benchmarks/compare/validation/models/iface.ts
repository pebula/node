export interface BasicModel {
  number: number;
  negNumber: number;
  maxNumber: number;
  strings: string[];
  longString: string;
  boolean: boolean;
  deeplyNested: BasicModelNested;
}

export interface BasicModelNested {
  foo: string;
  num: number;
  bool: boolean;
}
