export const BasicModelFV = {
  number: { type: 'number' },
  negNumber: { type: 'number', negative: true },
  maxNumber: { type: 'number', max: 500 },
  strings: { type: 'array', items: 'string' },
  longString: { type: 'string' },
  boolean: { type: 'boolean' },
  deeplyNested: {
    type: 'object',
    props: {
      foo: { type: 'string' },
      num: { type: 'number' },
      bool: { type: 'boolean' },
    }
  }
};

