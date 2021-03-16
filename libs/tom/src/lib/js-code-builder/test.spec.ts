import * as C from './index';
import { StringBuilder } from './utils';

describe('', () => {
  it('should init a program', () => {
    const p = new C.Program();
    expect(p['program']).toBe(p);
    expect(p.parent).toBeNull();
  });

  it('should generate variable declaration', () => {
    const p = new C.Program();
    p
    .addVariable(true)
      .assignValue(`'this is a test'`)
      .parent
    .addVariable(false)
      .assignValue('1234')
      .parent;

    const expected = new StringBuilder()
      .appendLine(`const $0 = 'this is a test';`)
      .appendLine(`let $1 = 1234;`);

    expect(p.generateCode()).toEqual(expected.toString());
  });

  it('should generate variable declaration manually', () => {
    const p = new C.Program();
    p
    .addVariable(true)
      .assignValue(`'this is a test'`)
      .parent
    .add(new C.VariableDeclaration(p, false, 'myVar').assignValue('1234'))
    .add(new C.VariableDeclaration(p, false).assignValue('9999'))

    const expected = new StringBuilder()
      .appendLine(`const $0 = 'this is a test';`)
      .appendLine(`let myVar = 1234;`)
      .appendLine(`let $1 = 9999;`);

    expect(p.generateCode()).toEqual(expected.toString());
  });

  it('should generate function call expressions', () => {
    expect(new C.Program().addFnCallExpression('myMethod', 'a', 'b', 'c', 'd').parent.generateCode())
      .toEqual(new StringBuilder().appendLine(`myMethod(a, b, c, d);`).toString());

    expect(new C.Program().addFnCallExpression('myMethod').parent.generateCode())
      .toEqual(new StringBuilder().appendLine(`myMethod();`).toString());
  });

  it('should generate if blocks', () => {
    const p = new C.Program();
    p
    .addIfBlock()
      .setCondition('1 + 1 === 2')
      .addVariable().assignValue('15').parent
      .elseIf()
        .setCondition('3 + 5 === 9')
        .addVariable().assignValue('15').parent
        .parent
      .else()
        .addVariable(false).assignValue('15').parent
        .parent
      .parent

      const expected = new StringBuilder()
      .appendLine(`if (1 + 1 === 2) {`)
      .appendLine(`  const $0 = 15;`)
      .appendLine(`} else if (3 + 5 === 9) {`)
      .appendLine(`  const $1 = 15;`)
      .appendLine(`} else {`)
      .appendLine(`  let $2 = 15;`)
      .appendLine(`}`);


    expect(p.generateCode()).toEqual(expected.toString());
  });


  it('should generate for of blocks', () => {
    const blocks: { forOf: C.ForOfBlock<any>, v1: C.VariableDeclaration<any> } = {} as any;
    const p = new C.Program(blocks)
      .addForOfBlock().saveRef('forOf')
        .setIterableExpression('[1, 2, 3, 4]')
        .addVariable().saveRef('v1')
          .assignValue(`${blocks.forOf.varName} + 5`)
          .parent
        .use( forOf => forOf.add(new C.Statement(forOf, `console.log(${blocks.v1.name})`)) )
        .parent;


    const expected = new StringBuilder()
    .appendLine(`for (const ${blocks.forOf.varName} of [1, 2, 3, 4]) {`)
    .appendLine(`  const ${blocks.v1.name} = ${blocks.forOf.varName} + 5;`)
    .appendLine(`  console.log(${blocks.v1.name});`)
    .appendLine(`}`);


    expect(p.generateCode()).toEqual(expected.toString());
  });

  it('should generate for of array-spread var name blocks', () => {
    const blocks: { forOf: C.ForOfBlock<any>, v0: C.VariableDeclaration<any> } = {} as any;
    const p = new C.Program(blocks)
      .addVariable().saveRef('v0')
          .assignValue(`new Map()`)
          .parent
      .addForOfBlock().saveRef('forOf')
        .setArraySpreadParam(2)
        .setIterableExpression(`${blocks.v0.name}.entries()`)
        .use( forOf => forOf.add(new C.Statement(forOf, `console.log(${blocks.forOf.varName[0]}, ${blocks.forOf.varName[1]})`)) )
        .parent;


    const expected = new StringBuilder()
    .appendLine(`const ${blocks.v0.name} = new Map();`)
    .appendLine(`for (const [${blocks.forOf.varName[0]}, ${blocks.forOf.varName[1]}] of ${blocks.v0.name}.entries()) {`)
    .appendLine(`  console.log(${blocks.forOf.varName[0]}, ${blocks.forOf.varName[1]});`)
    .appendLine(`}`);


    expect(p.generateCode()).toEqual(expected.toString());
  });

});
