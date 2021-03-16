import { StringBuilder } from './string-builder';

describe('StringBuilder', () => {
  it('should build strings', () => {
    const sb = new StringBuilder();
    const buffer = Buffer.from([0x30, 0x31, 0x32]); // 012

    sb
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three')
      .appendLine('4')
      .append(12)
      .appendLine()
      .append(1)
      .append(0)
      .appendLine()
      .appendLine()
      .appendLine()
      .appendLine(true)
      .appendLine(false)
      .appendLine(buffer)
      .appendLine()
      .append(undefined)
      .appendLine()
      .append(null)
      .appendLine()
      .appendLine(null)
      .appendLine('THE-END');

    const expected =
`This isTEST
One Two Three
4
12
10


true
false
012




THE-END
`;

    expect(sb.toString()).toEqual(expected)
  });

  it('should trim last new line', () => {
    const sb = new StringBuilder()
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three')
      .trimNewLine();

    const expected =
`This isTEST
One Two Three`;

    expect(sb.toString()).toEqual(expected)
  });

  it('should trim multi last new line', () => {
    const sb = new StringBuilder()
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three')
      .appendLine()
      .appendLine()
      .trimNewLine();

    const expected =
`This isTEST
One Two Three`;

    expect(sb.toString()).toEqual(expected)
  });

  it('should undo last line', () => {
    const sb = new StringBuilder()
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three')
      .undo();

    const expected = `This isTEST
`;

    expect(sb.toString()).toEqual(expected)
  });

  it('should undo multi last line', () => {
    let sb = new StringBuilder()
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three')
      .undo(2);

    let expected = `This is`;

    expect(sb.toString()).toEqual(expected)

    sb = new StringBuilder()
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three')
      .undo(100);

    expected = ``;

    expect(sb.toString()).toEqual(expected)
  });

  it('should flush', () => {
    const sb = new StringBuilder()
      .append("This is")
      .appendLine("TEST")
      .appendLine('One Two Three');

    const expected =
`This isTEST
One Two Three
`;

    expect(sb.flush()).toEqual(expected)
    expect(sb.flush()).toEqual('');
  });
});
