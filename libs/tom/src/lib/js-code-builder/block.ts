import { StringBuilder } from './utils';
import { Base } from './base';

export class Block<TParent extends Block<any>> extends Base<TParent> {

  get length() { return this.statements.length; }

  protected statements: Base<this>[] = [];

  constructor(parent: TParent) {
    super(parent);
  }

  commit(): void {
    for (const c of this.statements) {
      c.commit();
    }
  }

  validate(): void {
    for (const c of this.statements) {
      c.validate();
    }
  }

  flush(sb: StringBuilder): void {
    sb.indentInc();
    for (const c of this.statements) {
      c.flush(sb);
    }
    sb.indentDec();
  }

  get(idx: number) {
    return this.statements[idx];
  }

  add(code: Base<this>) {
    Block.updateParent(code, this);
    this.statements.push(code);
    return this;
  }

  clear() {
    return this.statements.splice(0, this.statements.length);
  }

  insertBefore(code: Base<this>, before: Base<this>) {
    const index = this.statements.indexOf(before);
    if (index === -1) {
      throw new Error('Provided block is not a child of this block.');
    }
    Block.updateParent(code, this);
    this.statements.splice(index, 0, code);
    return this;
  }
}
