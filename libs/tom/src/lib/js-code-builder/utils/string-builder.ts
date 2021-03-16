import * as OS from 'os';
import { Stream } from 'stream';

export class StringBuilder extends Stream {

  public newLine = OS.EOL;

  private buffer: string[] = [];

  private indent = { curr: 0, table: [''], unit: '  ' };
  private currIndent = '';

  indentInc(): this {
    this.indent.curr += 1;
    if (!this.indent.table[this.indent.curr]) {
      this.indent.table[this.indent.curr] = new Array(this.indent.curr).fill(this.indent.unit).join('');
    }
    this.currIndent = this.indent.table[this.indent.curr];
    return this;
  }

  indentDec(): this {
    this.indent.curr = Math.max(this.indent.curr - 1, 0);
    this.currIndent = this.indent.table[this.indent.curr];
    return this;
  }

  freezeIndent(): this {
    this.currIndent = '';
    return this;
  }

  unFreezeIndent(): this {
    this.currIndent = this.indent.table[this.indent.curr];
    return this;
  }

  append(value: any) {
    if (value != null) {
      this.buffer.push(this.currIndent + value);
    }
    return this;
  }

  appendLine(value?: any) {
    this.buffer.push((value != null ? this.currIndent + value : '') + this.newLine);
    return this;
  }

  combine(sb: StringBuilder) {
    this.buffer.push(...sb.buffer);
    return this;
  }

  undo(count = 1) {
    while (count > 0 && this.buffer.pop()) { count -= 1; }
    return this;
  }

  trimNewLine() {
    let len = this.buffer.length - 1;
    while (this.buffer[len]?.endsWith('\n')) {
      let last = this.buffer.pop();
      last = last.substr(0, last.length - this.newLine.length);
      if (last.length > 0) {
        this.buffer.push(last);
      } else {
        len -= 1;
      }
    }
    return this;
  }

  clear() {
    this.buffer = [];
  }

  flush(): string {
    const buffer = this.buffer;
    this.clear();
    return buffer.join('');
  }

  toString(): string {
    return this.buffer.join('');
  }
}
